import React, { useState } from "react";
import { Calendar, Clock, X, CheckCircle, AlertCircle } from "lucide-react";

const YourCart = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      serviceName: "Carpenter",
      date: "Mon, Dec 25",
      time: "10:00 AM",
      price: 800,
      status: "confirmed",
      bookedAt: "2024-12-24",
      phoneNumber: "+91 8860909796",
      address: "Home - shakti nagar, Kali Nagar, Pocket 4",
    },
    {
      id: 2,
      serviceName: "Electrician",
      date: "Tue, Dec 26",
      time: "02:00 PM",
      price: 600,
      status: "confirmed",
      bookedAt: "2024-12-24",
      phoneNumber: "+91 8860909796",
      address: "Home - shakti nagar, Kali Nagar, Pocket 4",
    },
    {
      id: 3,
      serviceName: "Plumber",
      date: "Wed, Dec 27",
      time: "11:00 AM",
      price: 700,
      status: "confirmed",
      bookedAt: "2024-12-24",
      phoneNumber: "+91 8860909796",
      address: "Home - shakti nagar, Kali Nagar, Pocket 4",
    },
  ]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      // Remove booking from list
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== bookingToCancel.id)
      );

      // Show success message
      setSnackbarMessage(
        `${bookingToCancel.serviceName} booking cancelled successfully`
      );
      setShowSnackbar(true);

      // Hide snackbar after 3 seconds
      setTimeout(() => setShowSnackbar(false), 3000);
    }

    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  const totalAmount = bookings.reduce((sum, booking) => sum + booking.price, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "8px",
              margin: 0,
            }}
          >
            Your Bookings
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: 0,
              marginTop: "8px",
            }}
          >
            Manage your service bookings
          </p>
        </div>

        {bookings.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          color: "#111827",
                          margin: 0,
                        }}
                      >
                        {booking.serviceName}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          backgroundColor: "#dcfce7",
                          color: "#166534",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        <CheckCircle
                          style={{ width: "12px", height: "12px" }}
                        />
                        {booking.status}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Calendar
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#6b7280",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#374151",
                            fontWeight: "500",
                          }}
                        >
                          {booking.date}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Clock
                          style={{
                            width: "16px",
                            height: "16px",
                            color: "#6b7280",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#374151",
                            fontWeight: "500",
                          }}
                        >
                          {booking.time}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "12px",
                        lineHeight: "1.4",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>Address: </span>
                      {booking.address}
                    </div>

                    <div style={{ fontSize: "14px", color: "#6b7280" }}>
                      <span style={{ fontWeight: "500" }}>Contact: </span>
                      {booking.phoneNumber}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "16px",
                      marginLeft: "24px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#111827",
                      }}
                    >
                      ₹{booking.price}
                    </div>
                    <button
                      onClick={() => handleCancelClick(booking)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        backgroundColor: "#fef2f2",
                        color: "#dc2626",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#fee2e2";
                        e.target.style.borderColor = "#f87171";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#fef2f2";
                        e.target.style.borderColor = "#fecaca";
                      }}
                    >
                      <X style={{ width: "16px", height: "16px" }} />
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Summary */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "2px solid #8b5cf6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Total Bookings: {bookings.length}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      margin: 0,
                      marginTop: "4px",
                    }}
                  >
                    Total amount for all services
                  </p>
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#8b5cf6",
                  }}
                >
                  ₹{totalAmount}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "48px",
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              No Bookings Yet
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              You haven't made any service bookings yet. Start by selecting a
              service!
            </p>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Browse Services
            </button>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && bookingToCancel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
          onClick={closeCancelModal}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <AlertCircle
                style={{ width: "24px", height: "24px", color: "#f59e0b" }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                }}
              >
                Cancel Booking
              </h3>
            </div>

            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to cancel your{" "}
              <strong>{bookingToCancel.serviceName}</strong> booking scheduled
              for <strong>{bookingToCancel.date}</strong> at{" "}
              <strong>{bookingToCancel.time}</strong>?
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeCancelModal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Snackbar */}
      {showSnackbar && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "red",
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 1000,
          }}
        >
          <CheckCircle style={{ width: "20px", height: "20px" }} />
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            {snackbarMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default YourCart;
