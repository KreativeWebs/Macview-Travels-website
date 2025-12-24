import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import userAxios from "../api/userAxios";
import { countryCodes } from "../data/countryCodes";
import { toast } from "react-toastify";
import PaystackPayment from "../components/FlashSalePaystack";

function FlashSaleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashSale, setFlashSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState("form");
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    countryCode: "+234",
    dateOfBirth: "",
    gender: "",
    adults: "",
    children: "",
    infants: "",
  });

  useEffect(() => {
    fetchFlashSale();
  }, [id]);

  const fetchFlashSale = async () => {
    try {
      const response = await userAxios.get(`/flash-sales/${id}`);
      setFlashSale(response.data.flashSale);
    } catch (error) {
      console.error("Error fetching flash sale:", error);
      setMessage("Flash sale not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Upload file to backend (Cloudinary)
  const handleFileUpload = async (file, reqLabel, fileIndex) => {
    const form = new FormData();
    form.append("file", file);

    // Set initial progress
    setUploadProgress((prev) => ({
      ...prev,
      [`${reqLabel}-${fileIndex}`]: { status: "uploading", progress: 0 },
    }));

    try {
      const res = await fetch(
        "https://macview-travels-website-production.up.railway.app/api/flash-sales/upload-document",
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) throw new Error("File upload failed");
      const data = await res.json();

      if (!data.success) throw new Error(data.error || "File upload failed");

      // Update progress to success
      setUploadProgress((prev) => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: "success", progress: 100 },
      }));

      return {
        fileUrl: data.fileUrl,
        originalName: file.name,
      };
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress((prev) => ({
        ...prev,
        [`${reqLabel}-${fileIndex}`]: { status: "error", progress: 0 },
      }));
      throw error;
    }
  };

  const handleFileChange = async (e, reqLabel) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, JPG)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFiles((prev) => ({ ...prev, [reqLabel]: file }));

    try {
      const uploadResult = await handleFileUpload(file, reqLabel, 0);
      setFormData((prev) => ({
        ...prev,
        [reqLabel]: uploadResult.fileUrl,
        [`${reqLabel}Name`]: uploadResult.originalName,
      }));
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("File upload failed. Please try again.");
      setSelectedFiles((prev) => ({ ...prev, [reqLabel]: null }));
    }
  };

  const handleNext = () => {
    // Check if all required fields are filled
    if (
      !formData.name ||
      !formData.whatsappNumber ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.passportPhotograph ||
      !formData.adults
    ) {
      toast.error(
        "Please fill all required fields and upload your passport photograph"
      );
      return;
    }
    setCurrentStep("confirmation");
  };

  const handleBack = () => {
    setCurrentStep("form");
  };

  const handlePaymentSuccess = async (paymentRef) => {
    setBookingLoading(true);
    setMessage("");

    try {
      await userAxios.post("/flash-sales/book", {
        ...formData,
        whatsappNumber: formData.countryCode + formData.whatsappNumber,
        flashSaleId: id,
        payment: {
          status: "paid",
          provider: "paystack",
          transactionId: paymentRef.reference,
          amount: flashSale.price,
        },
      });
      navigate("/flash-sale-success", { state: { name: formData.name } });
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage("Error submitting booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setMessage("");

    try {
      await userAxios.post("/flash-sales/book", {
        ...formData,
        whatsappNumber: formData.countryCode + formData.whatsappNumber,
        flashSaleId: id,
      });
      setMessage("Booking submitted successfully! We will contact you soon.");
      setFormData({
        name: "",
        whatsappNumber: "",
        dateOfBirth: "",
        gender: "",
        adults: "",
        children: "",
        infants: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage("Error submitting booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!flashSale) {
    return (
      <Container className="py-5 text-center">
        <h2>Flash Sale Not Found</h2>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {currentStep === "form" && (
        <Row
          className="flash-sale-details-row"
          style={{
            marginTop: "100px",
          }}
        >
          <Col lg={8}>
            <Card>
              <Card.Img
                variant="top"
                src={flashSale.backgroundImage}
                alt={flashSale.destinationCity}
              />
              <Card.Body>
                <Card.Title>{flashSale.destinationCity} Flash Sale</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ₦{flashSale.price}
                  <br />
                  <strong>From:</strong> {flashSale.departureCity}
                  <br />
                  <strong>To:</strong> {flashSale.destinationCity}
                  <br />
                  <strong>Airline:</strong> {flashSale.airline}
                  <br />
                  <strong>Valid From:</strong>{" "}
                  {flashSale.dateValidFrom
                    ? new Date(flashSale.dateValidFrom).toLocaleDateString()
                    : "N/A"}
                  <br />
                  <strong>Valid Until:</strong>{" "}
                  {flashSale.dateValid
                    ? new Date(flashSale.dateValid).toLocaleDateString()
                    : "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Header>
                <h4>Book Now</h4>
              </Card.Header>
              <Card.Body>
                {message && (
                  <Alert
                    variant={
                      message.includes("successfully") ? "success" : "danger"
                    }
                  >
                    {message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>WhatsApp Number</Form.Label>
                    <div className="d-flex">
                      <Form.Select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        style={{ maxWidth: "120px", marginRight: "10px" }}
                        required
                      >
                        {countryCodes.map((country, index) => (
                          <option key={index} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="Enter WhatsApp number"
                        required
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Passport Photograph</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e, "passportPhotograph")
                      }
                      required
                    />
                    {selectedFiles.passportPhotograph && (
                      <div className="mt-2">
                        <small className="text-muted">
                          {selectedFiles.passportPhotograph.name}
                        </small>
                        {uploadProgress["passportPhotograph-0"] && (
                          <div
                            className="progress mt-1"
                            style={{ height: "6px" }}
                          >
                            <div
                              className={`progress-bar ${
                                uploadProgress["passportPhotograph-0"]
                                  .status === "success"
                                  ? "bg-success"
                                  : uploadProgress["passportPhotograph-0"]
                                      .status === "error"
                                  ? "bg-danger"
                                  : "bg-primary"
                              }`}
                              role="progressbar"
                              style={{
                                width: `${uploadProgress["passportPhotograph-0"].progress}%`,
                              }}
                              aria-valuenow={
                                uploadProgress["passportPhotograph-0"].progress
                              }
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        )}
                        {uploadProgress["passportPhotograph-0"] &&
                          uploadProgress["passportPhotograph-0"].status ===
                            "success" && (
                            <small className="text-success">
                              ✓ Uploaded successfully
                            </small>
                          )}
                        {uploadProgress["passportPhotograph-0"] &&
                          uploadProgress["passportPhotograph-0"].status ===
                            "error" && (
                            <small className="text-danger">
                              ✗ Upload failed
                            </small>
                          )}
                        {uploadProgress["passportPhotograph-0"] &&
                          uploadProgress["passportPhotograph-0"].status ===
                            "uploading" && (
                            <small className="text-primary">Uploading...</small>
                          )}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Adults (12yrs +)</Form.Label>
                    <Form.Control
                      type="number"
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Children (2yrs - 12yrs)</Form.Label>
                    <Form.Control
                      type="number"
                      name="children"
                      value={formData.children}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Infants (Below 2yrs)</Form.Label>
                    <Form.Control
                      type="number"
                      name="infants"
                      value={formData.infants}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    type="button"
                    onClick={handleNext}
                    style={{ backgroundColor: "#f1741e", color: "white", border: "none", paddingLeft : "20px", paddingRight : "20px" }}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Submitting..." : "Next"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {currentStep === "confirmation" && (
        <Row
          className="flash-sale-details-row"
          style={{
            marginTop: "100px",
          }}
        >
          <Col lg={8}>
            <Card>
              <Card.Img
                variant="top"
                src={flashSale.backgroundImage}
                alt={flashSale.destinationCity}
              />
              <Card.Body>
                <Card.Title>{flashSale.destinationCity} Flash Sale</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ₦{flashSale.price}
                  <br />
                  <strong>From:</strong> {flashSale.departureCity}
                  <br />
                  <strong>To:</strong> {flashSale.destinationCity}
                  <br />
                  <strong>Airline:</strong> {flashSale.airline}
                  <br />
                  <strong>Valid From:</strong>{" "}
                  {flashSale.dateValidFrom
                    ? new Date(flashSale.dateValidFrom).toLocaleDateString()
                    : "N/A"}
                  <br />
                  <strong>Valid Until:</strong>{" "}
                  {flashSale.dateValid
                    ? new Date(flashSale.dateValid).toLocaleDateString()
                    : "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Header>
                <h4>Confirm Your Booking</h4>
              </Card.Header>
              <Card.Body>
                <h5>Booking Details:</h5>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>WhatsApp Number:</strong> {formData.countryCode}{" "}
                  {formData.whatsappNumber}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {formData.dateOfBirth}
                </p>
                <p>
                  <strong>Gender:</strong> {formData.gender}
                </p>
                <p>
                  <strong>Adults:</strong> {formData.adults}
                </p>
                <p>
                  <strong>Children:</strong> {formData.children || 0}
                </p>
                <p>
                  <strong>Infants:</strong> {formData.infants || 0}
                </p>
                <p>
                  <strong>Passport Photograph:</strong>
                </p>
                {formData.passportPhotograph && (
                  <div className="mt-2">
                    <img
                      src={formData.passportPhotograph}
                      alt="Passport Photograph"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      className="img-thumbnail"
                      onLoad={() =>
                        console.log(
                          "Image loaded successfully:",
                          formData.passportPhotograph
                        )
                      }
                      onError={(e) => {
                        console.error(
                          "Image failed to load:",
                          formData.passportPhotograph
                        );
                        // Try to fetch the image to see the response
                        fetch(formData.passportPhotograph)
                          .then((response) => {
                            console.log(
                              "Image fetch response:",
                              response.status,
                              response.statusText
                            );
                            if (!response.ok) {
                              console.error(
                                "Image not accessible:",
                                response.status
                              );
                            }
                          })
                          .catch((error) =>
                            console.error("Fetch error:", error)
                          );
                        e.target.style.display = "none";
                      }}
                    />
                    <p className="mt-2 mb-0">
                      <small className="text-muted">
                        {formData.passportPhotographName || "Uploaded image"}
                      </small>
                    </p>
                  </div>
                )}
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
                  <Button
                    onClick={handleBack}
                    className="w-100 mt-3"
                    style={{ paddingTop: "1rem", paddingBottom: "1rem", backgroundColor: "#175aa1", border: "none", color: "white" }}
                  >
                    Back
                  </Button>
                  <PaystackPayment
                    amount={flashSale.price}
                    fullName={formData.name}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default FlashSaleDetails;
