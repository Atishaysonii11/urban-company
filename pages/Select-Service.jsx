import React, { useState, useEffect } from "react";
import { X, Clock, IndianRupee, Calendar, CheckCircle } from "lucide-react";
import "../Global_css/select_service.css";
import { useNavigate } from "react-router-dom";

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
      { time: "12:00 PM", price: basePrice + 100, available: true }, // Peak hour
      { time: "01:00 PM", price: basePrice + 100, available: true },
      { time: "02:00 PM", price: basePrice, available: true },
      { time: "03:00 PM", price: basePrice, available: false },
      { time: "04:00 PM", price: basePrice, available: true },
      { time: "05:00 PM", price: basePrice + 150, available: true }, // Evening premium
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

const SelectService = ({ onSelect, onBooking }) => {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (service) => {
    setSelected(service.id);
    setShowSnackbar(true);
    setShowModal(true);
    setAvailableSlots(generateSlots(service.basePrice));
    onSelect?.(service);

    // Hide snackbar after 3 seconds
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleSlotSelect = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
  };

  const handleBookSlot = () => {
    if (selectedSlot && selectedDate && selected) {
      const booking = {
        id: Date.now(),
        service: services.find((s) => s.id === selected),
        date: selectedDate,
        time: selectedSlot.time,
        price: selectedSlot.price,
        bookedAt: new Date(),
      };

      setCart((prev) => [...prev, booking]);
      onBooking?.(booking);
      setShowModal(false);
      setSelectedSlot(null);
      setSelectedDate(null);

      navigate("/checkout", { state: { cart: [...cart, booking] } });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setSelectedDate(null);
  };

  const selectedService = services.find((s) => s.id === selected);

  return (
    <>
      <div className="service-container">
        <div className="service-wrapper">
          <div className="service-header">
            <h1 className="service-title">Home services at your doorstep</h1>
            {cart.length > 0 && (
              <p className="cart-summary">
                {cart.length} service{cart.length > 1 ? "s" : ""} in cart -
                Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
              </p>
            )}
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleSelect(service)}
                className={`service-card ${
                  selected === service.id ? "selected" : ""
                }`}
              >
                <span className="service-name">{service.name}</span>
                <span className="service-price">From ₹{service.basePrice}</span>

                {selected === service.id && (
                  <div className="selection-indicator">
                    <CheckCircle size={16} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {showSnackbar && selectedService && (
        <div className="snackbar">
          <CheckCircle className="snackbar-icon" />
          <span>Selected service: {selectedService.name}</span>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Book {selectedService.name}</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="slots-container">
                {availableSlots.map((dayData, dayIndex) => (
                  <div key={dayIndex} className="day-section">
                    <h3 className="day-title">
                      <Calendar size={16} />
                      {dayData.dateString}
                    </h3>

                    <div className="slots-grid">
                      {dayData.slots.map((slot, slotIndex) => (
                        <button
                          key={slotIndex}
                          onClick={() =>
                            slot.available && handleSlotSelect(dayData, slot)
                          }
                          disabled={!slot.available}
                          className={`slot-card ${
                            !slot.available
                              ? "unavailable"
                              : selectedDate === dayData &&
                                selectedSlot === slot
                              ? "selected"
                              : ""
                          }`}
                        >
                          <div className="slot-time">
                            <Clock size={14} />
                            {slot.time}
                          </div>
                          <div className="slot-price">
                            <IndianRupee size={12} />
                            {slot.price}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              {selectedSlot && selectedDate && (
                <div className="booking-summary">
                  <p>
                    <strong>Service:</strong> {selectedService.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedDate.dateString}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedSlot.time}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{selectedSlot.price}
                  </p>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleBookSlot}
                  disabled={!selectedSlot || !selectedDate}
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectService;
