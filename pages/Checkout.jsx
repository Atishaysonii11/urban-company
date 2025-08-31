import React, { useState, useEffect } from "react";
import { MapPin, Phone, Edit, Crosshair, Calendar, Clock } from "lucide-react";

const Checkout = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Get service ID from URL parameters
  const getServiceIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"));
  };

  // Sample data - replace with your backend data
  const defaultAddress = "Home - shakti nagar, Kali Nagar, Pocket 4, ...";

  const services = [
    { id: 1, name: "Haircut", basePrice: 500 },
    { id: 2, name: "Carpenter", basePrice: 800 },
    { id: 3, name: "Electrician", basePrice: 600 },
    { id: 4, name: "Car Washer", basePrice: 300 },
    { id: 5, name: "Plumber", basePrice: 700 },
    { id: 6, name: "Painter", basePrice: 1200 },
    { id: 7, name: "Appliance Repair", basePrice: 900 },
    { id: 8, name: "Cleaning", basePrice: 400 },
    { id: 9, name: "Pest Control", basePrice: 1500 },
    { id: 10, name: "Salon at Home", basePrice: 800 },
    { id: 11, name: "Fitness", basePrice: 1000 },
    { id: 12, name: "Massage", basePrice: 1200 },
    { id: 13, name: "Spa", basePrice: 2000 },
  ];

  // Generate available slots for the next 3 days
  const generateSlots = (basePrice) => {
    const slots = [];
    const today = new Date();

    for (let day = 0; day < 3; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);

      const daySlots = [
        { time: "09:00 AM", price: basePrice, available: true },
        { time: "10:00 AM", price: basePrice, available: true },
        { time: "11:00 AM", price: basePrice, available: false },
        { time: "12:00 PM", price: basePrice + 100, available: true },
        { time: "01:00 PM", price: basePrice + 100, available: true },
        { time: "02:00 PM", price: basePrice, available: true },
        { time: "03:00 PM", price: basePrice, available: false },
        { time: "04:00 PM", price: basePrice, available: true },
        { time: "05:00 PM", price: basePrice + 150, available: true },
        { time: "06:00 PM", price: basePrice + 150, available: true },
      ];

      slots.push({
        date: date,
        dateString: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        slots: daySlots,
      });
    }

    return slots;
  };

  useEffect(() => {
    setAddress(defaultAddress);

    // Get service ID from URL and generate slots
    const serviceId = getServiceIdFromUrl();
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setAvailableSlots(generateSlots(service.basePrice));
      }
    }
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      return;
    }

    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setAddress(
          `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        );
        setIsEditingAddress(false);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied by user");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information unavailable");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out");
            break;
          default:
            setLocationError("An unknown error occurred");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      }
    );
  };

  const handleSlotSelect = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
  };

  // Get current service info
  const serviceId = getServiceIdFromUrl();
  const currentService = services.find((s) => s.id === serviceId);

  const cartItems = currentService
    ? [
        {
          id: 1,
          name: currentService.name,
          price: selectedSlot ? selectedSlot.price : currentService.basePrice,
        },
      ]
    : [];

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* Left Side - Booking Details */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Contact Details */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  Send booking details to
                </h3>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Phone
                  style={{ width: "20px", height: "20px", color: "#6b7280" }}
                />
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    outline: "none",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
            </div>

            {/* Address */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  Address
                </h3>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <button
                    onClick={getCurrentLocation}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#2563eb",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#1d4ed8")}
                    onMouseOut={(e) => (e.target.style.color = "#2563eb")}
                  >
                    <Crosshair style={{ width: "16px", height: "16px" }} />
                    <span>Current Location</span>
                  </button>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#2563eb",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#1d4ed8")}
                    onMouseOut={(e) => (e.target.style.color = "#2563eb")}
                  >
                    <Edit style={{ width: "16px", height: "16px" }} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              {isEditingAddress ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      outline: "none",
                      resize: "none",
                      fontSize: "14px",
                      fontFamily: "inherit",
                    }}
                    rows="3"
                    placeholder="Enter your address"
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#8b5cf6",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      alignSelf: "flex-start",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#7c3aed")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#8b5cf6")
                    }
                  >
                    Save Address
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <MapPin
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#6b7280",
                      marginTop: "2px",
                    }}
                  />
                  <span style={{ color: "#374151", fontSize: "14px" }}>
                    {address}
                  </span>
                </div>
              )}

              {locationError && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ fontSize: "14px", color: "#dc2626", margin: 0 }}>
                    {locationError}
                  </p>
                </div>
              )}
            </div>

            {/* Date & Time Selection */}
            {currentService && (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <Calendar
                    style={{ width: "20px", height: "20px", color: "#6b7280" }}
                  />
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Select Date & Time
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {availableSlots.map((dayData, dayIndex) => (
                    <div key={dayIndex}>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#374151",
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Calendar style={{ width: "16px", height: "16px" }} />
                        {dayData.dateString}
                      </h4>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(120px, 1fr))",
                          gap: "8px",
                        }}
                      >
                        {dayData.slots.map((slot, slotIndex) => (
                          <button
                            key={slotIndex}
                            onClick={() =>
                              slot.available && handleSlotSelect(dayData, slot)
                            }
                            disabled={!slot.available}
                            style={{
                              padding: "12px 8px",
                              borderRadius: "8px",
                              border:
                                selectedDate === dayData &&
                                selectedSlot === slot
                                  ? "2px solid #8b5cf6"
                                  : slot.available
                                  ? "1px solid #d1d5db"
                                  : "1px solid #f3f4f6",
                              backgroundColor:
                                selectedDate === dayData &&
                                selectedSlot === slot
                                  ? "#f3f4f6"
                                  : slot.available
                                  ? "white"
                                  : "#f9fafb",
                              cursor: slot.available
                                ? "pointer"
                                : "not-allowed",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.2s",
                            }}
                            onMouseOver={(e) => {
                              if (
                                slot.available &&
                                !(
                                  selectedDate === dayData &&
                                  selectedSlot === slot
                                )
                              ) {
                                e.target.style.borderColor = "#8b5cf6";
                                e.target.style.backgroundColor = "#f8fafc";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (
                                slot.available &&
                                !(
                                  selectedDate === dayData &&
                                  selectedSlot === slot
                                )
                              ) {
                                e.target.style.borderColor = "#d1d5db";
                                e.target.style.backgroundColor = "white";
                              }
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "13px",
                                fontWeight: "500",
                                color: slot.available ? "#374151" : "#9ca3af",
                              }}
                            >
                              <Clock
                                style={{ width: "12px", height: "12px" }}
                              />
                              {slot.time}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: slot.available ? "#059669" : "#9ca3af",
                                fontWeight: "600",
                              }}
                            >
                              ₹{slot.price}
                            </div>
                            {!slot.available && (
                              <div
                                style={{ fontSize: "10px", color: "#ef4444" }}
                              >
                                Unavailable
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <button
              disabled={!phoneNumber.trim() || !selectedSlot || !selectedDate}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                fontWeight: "600",
                color: "white",
                border: "none",
                cursor:
                  phoneNumber.trim() && selectedSlot && selectedDate
                    ? "pointer"
                    : "not-allowed",
                backgroundColor:
                  phoneNumber.trim() && selectedSlot && selectedDate
                    ? "#8b5cf6"
                    : "#d1d5db",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (phoneNumber.trim() && selectedSlot && selectedDate) {
                  e.target.style.backgroundColor = "#7c3aed";
                }
              }}
              onMouseOut={(e) => {
                if (phoneNumber.trim() && selectedSlot && selectedDate) {
                  e.target.style.backgroundColor = "#8b5cf6";
                }
              }}
            >
              Book Now
            </button>
          </div>

          {/* Right Side - Cart Summary */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "16px",
                  marginTop: 0,
                }}
              >
                Order Summary
              </h3>

              {currentService ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#374151", fontSize: "14px" }}>
                        {currentService.name}
                      </span>
                      <span style={{ fontWeight: "500", color: "#111827" }}>
                        ₹
                        {selectedSlot
                          ? selectedSlot.price
                          : currentService.basePrice}
                      </span>
                    </div>
                  </div>

                  {selectedDate && selectedSlot && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "12px",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "8px",
                        border: "1px solid #e0f2fe",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#0369a1",
                          marginBottom: "8px",
                        }}
                      >
                        Selected Slot:
                      </div>
                      <div style={{ fontSize: "12px", color: "#0c4a6e" }}>
                        <div>{selectedDate.dateString}</div>
                        <div>{selectedSlot.time}</div>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      marginTop: "16px",
                      paddingTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#111827",
                        }}
                      >
                        Total
                      </span>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#111827",
                        }}
                      >
                        ₹
                        {selectedSlot
                          ? selectedSlot.price
                          : currentService.basePrice}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  No service selected
                </div>
              )}

              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                }}
              >
                <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                  Final amount will be confirmed after service completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
