import React, { useState } from "react";
import { CheckCircle, X, Star, MapPin, Clock } from "lucide-react";
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

const serviceProviders = {
  1: [
    // Haircut
    {
      id: 101,
      name: "Rajesh Kumar",
      rating: 4.8,
      experience: "5 years",
      distance: "1.2 km",
      price: 500,
    },
    {
      id: 102,
      name: "Amit Singh",
      rating: 4.6,
      experience: "3 years",
      distance: "2.1 km",
      price: 550,
    },
    {
      id: 103,
      name: "Suresh Sharma",
      rating: 4.9,
      experience: "7 years",
      distance: "0.8 km",
      price: 600,
    },
  ],
  2: [
    // Carpenter
    {
      id: 201,
      name: "Mohan Lal",
      rating: 4.7,
      experience: "8 years",
      distance: "1.5 km",
      price: 800,
    },
    {
      id: 202,
      name: "Ravi Verma",
      rating: 4.5,
      experience: "4 years",
      distance: "3.2 km",
      price: 750,
    },
    {
      id: 203,
      name: "Deepak Gupta",
      rating: 4.8,
      experience: "6 years",
      distance: "2.0 km",
      price: 850,
    },
  ],
  3: [
    // Electrician
    {
      id: 301,
      name: "Vikram Joshi",
      rating: 4.6,
      experience: "5 years",
      distance: "1.8 km",
      price: 600,
    },
    {
      id: 302,
      name: "Manoj Kumar",
      rating: 4.7,
      experience: "9 years",
      distance: "2.5 km",
      price: 650,
    },
    {
      id: 303,
      name: "Ankit Sharma",
      rating: 4.4,
      experience: "3 years",
      distance: "1.1 km",
      price: 580,
    },
  ],
  4: [
    // Car Washer
    {
      id: 401,
      name: "Rohit Singh",
      rating: 4.5,
      experience: "2 years",
      distance: "0.9 km",
      price: 300,
    },
    {
      id: 402,
      name: "Kiran Yadav",
      rating: 4.3,
      experience: "4 years",
      distance: "1.7 km",
      price: 320,
    },
    {
      id: 403,
      name: "Sanjay Kumar",
      rating: 4.6,
      experience: "3 years",
      distance: "2.3 km",
      price: 350,
    },
  ],
  5: [
    // Plumber
    {
      id: 501,
      name: "Ramesh Gupta",
      rating: 4.8,
      experience: "10 years",
      distance: "1.3 km",
      price: 700,
    },
    {
      id: 502,
      name: "Ajay Singh",
      rating: 4.5,
      experience: "5 years",
      distance: "2.8 km",
      price: 680,
    },
    {
      id: 503,
      name: "Sunil Kumar",
      rating: 4.7,
      experience: "7 years",
      distance: "1.9 km",
      price: 720,
    },
  ],
  6: [
    // Painter
    {
      id: 601,
      name: "Prakash Sharma",
      rating: 4.6,
      experience: "8 years",
      distance: "2.1 km",
      price: 1200,
    },
    {
      id: 602,
      name: "Dinesh Kumar",
      rating: 4.4,
      experience: "6 years",
      distance: "3.0 km",
      price: 1150,
    },
    {
      id: 603,
      name: "Mukesh Verma",
      rating: 4.7,
      experience: "9 years",
      distance: "1.6 km",
      price: 1250,
    },
  ],
  7: [
    // Appliance Repair
    {
      id: 701,
      name: "Ashok Kumar",
      rating: 4.5,
      experience: "7 years",
      distance: "1.4 km",
      price: 900,
    },
    {
      id: 702,
      name: "Vinod Singh",
      rating: 4.6,
      experience: "5 years",
      distance: "2.2 km",
      price: 850,
    },
    {
      id: 703,
      name: "Pawan Gupta",
      rating: 4.8,
      experience: "10 years",
      distance: "2.9 km",
      price: 950,
    },
  ],
  8: [
    // Cleaning
    {
      id: 801,
      name: "Sunita Devi",
      rating: 4.7,
      experience: "4 years",
      distance: "0.7 km",
      price: 400,
    },
    {
      id: 802,
      name: "Kamala Singh",
      rating: 4.5,
      experience: "3 years",
      distance: "1.5 km",
      price: 380,
    },
    {
      id: 803,
      name: "Rekha Sharma",
      rating: 4.6,
      experience: "5 years",
      distance: "2.1 km",
      price: 420,
    },
  ],
  9: [
    // Pest Control
    {
      id: 901,
      name: "Gopal Verma",
      rating: 4.8,
      experience: "12 years",
      distance: "3.1 km",
      price: 1500,
    },
    {
      id: 902,
      name: "Rajesh Singh",
      rating: 4.6,
      experience: "8 years",
      distance: "2.4 km",
      price: 1450,
    },
    {
      id: 903,
      name: "Anil Kumar",
      rating: 4.7,
      experience: "10 years",
      distance: "1.8 km",
      price: 1550,
    },
  ],
  10: [
    // Salon at Home
    {
      id: 1001,
      name: "Priya Sharma",
      rating: 4.9,
      experience: "6 years",
      distance: "1.2 km",
      price: 800,
    },
    {
      id: 1002,
      name: "Neha Singh",
      rating: 4.7,
      experience: "4 years",
      distance: "2.0 km",
      price: 750,
    },
    {
      id: 1003,
      name: "Kavita Gupta",
      rating: 4.8,
      experience: "8 years",
      distance: "1.7 km",
      price: 850,
    },
  ],
  11: [
    // Fitness
    {
      id: 1101,
      name: "Arjun Kumar",
      rating: 4.8,
      experience: "7 years",
      distance: "1.9 km",
      price: 1000,
    },
    {
      id: 1102,
      name: "Rohit Sharma",
      rating: 4.6,
      experience: "5 years",
      distance: "2.3 km",
      price: 950,
    },
    {
      id: 1103,
      name: "Vishal Singh",
      rating: 4.7,
      experience: "6 years",
      distance: "1.4 km",
      price: 1050,
    },
  ],
  12: [
    // Massage
    {
      id: 1201,
      name: "Santosh Kumar",
      rating: 4.7,
      experience: "9 years",
      distance: "2.1 km",
      price: 1200,
    },
    {
      id: 1202,
      name: "Mahesh Gupta",
      rating: 4.5,
      experience: "6 years",
      distance: "1.8 km",
      price: 1150,
    },
    {
      id: 1203,
      name: "Suresh Singh",
      rating: 4.8,
      experience: "11 years",
      distance: "2.5 km",
      price: 1250,
    },
  ],
  13: [
    // Spa
    {
      id: 1301,
      name: "Anjali Sharma",
      rating: 4.9,
      experience: "8 years",
      distance: "2.7 km",
      price: 2000,
    },
    {
      id: 1302,
      name: "Pooja Singh",
      rating: 4.7,
      experience: "5 years",
      distance: "3.1 km",
      price: 1950,
    },
    {
      id: 1303,
      name: "Meera Gupta",
      rating: 4.8,
      experience: "7 years",
      distance: "2.2 km",
      price: 2100,
    },
  ],
};

const SelectService = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceData, setSelectedServiceData] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelected(service.id);
    setSelectedServiceData(service);
    setShowModal(true);
    onSelect?.(service);
  };

  const handleProviderSelect = (provider) => {
    setShowSnackbar(true);
    setShowModal(false);

    setTimeout(() => setShowSnackbar(false), 2000);

    setTimeout(() => {
      navigate(
        `/checkout?id=${selectedServiceData.id}&providerId=${provider.id}`
      );
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
    setSelectedServiceData(null);
  };

  const providers = selectedServiceData
    ? serviceProviders[selectedServiceData.id] || []
    : [];

  return (
    <>
      <div className="service-container">
        <div className="service-wrapper">
          <div className="service-header">
            <h1 className="service-title">Home services at your doorstep</h1>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
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

      {/* Provider Selection Modal */}
      {showModal && selectedServiceData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select {selectedServiceData.name} Provider</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="providers-list">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="provider-card"
                  onClick={() => handleProviderSelect(provider)}
                >
                  <div className="provider-info">
                    <div className="provider-header">
                      <h3 className="provider-name">{provider.name}</h3>
                    </div>
                  </div>

                  <div className="provider-price">₹{provider.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {showSnackbar && (
        <div className="snackbar">
          <CheckCircle className="snackbar-icon" />
          <span>Provider selected! Redirecting to checkout...</span>
        </div>
      )}
    </>
  );
};

export default SelectService;
