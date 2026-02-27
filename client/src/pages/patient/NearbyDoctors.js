import React, { useState } from 'react';
import './PatientDashboard.css';

const NearbyDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'general', label: 'General Physician' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'dermatology', label: 'Dermatology' },
    { id: 'neurology', label: 'Neurology' },
    { id: 'orthopedics', label: 'Orthopedics' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'psychiatry', label: 'Psychiatry' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      specialtyId: 'cardiology',
      avatar: '👩‍⚕️',
      rating: 4.9,
      reviews: 234,
      experience: '15 years',
      hospital: 'City Heart Center',
      distance: '0.8 miles',
      address: '123 Medical Plaza, Suite 400',
      nextAvailable: 'Today, 2:30 PM',
      availableToday: true,
      consultationFee: 150,
      languages: ['English', 'Mandarin'],
      education: 'Harvard Medical School',
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      specialty: 'General Physician',
      specialtyId: 'general',
      avatar: '👨‍⚕️',
      rating: 4.8,
      reviews: 312,
      experience: '12 years',
      hospital: 'Downtown Medical Center',
      distance: '1.2 miles',
      address: '456 Health Ave, Floor 3',
      nextAvailable: 'Today, 4:00 PM',
      availableToday: true,
      consultationFee: 100,
      languages: ['English', 'Spanish'],
      education: 'Johns Hopkins University',
      acceptsInsurance: true
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      specialty: 'Neurologist',
      specialtyId: 'neurology',
      avatar: '👩‍⚕️',
      rating: 4.9,
      reviews: 189,
      experience: '18 years',
      hospital: 'Neuro Specialty Clinic',
      distance: '2.1 miles',
      address: '789 Brain Health Blvd',
      nextAvailable: 'Tomorrow, 9:00 AM',
      availableToday: false,
      consultationFee: 200,
      languages: ['English'],
      education: 'Stanford Medical School',
      acceptsInsurance: true
    },
    {
      id: 4,
      name: 'Dr. Jessica Lee',
      specialty: 'Dermatologist',
      specialtyId: 'dermatology',
      avatar: '👩‍⚕️',
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      hospital: 'Skin Care Specialists',
      distance: '1.5 miles',
      address: '321 Wellness Way',
      nextAvailable: 'Today, 5:30 PM',
      availableToday: true,
      consultationFee: 125,
      languages: ['English', 'Korean'],
      education: 'UCLA Medical School',
      acceptsInsurance: true
    },
    {
      id: 5,
      name: 'Dr. David Park',
      specialty: 'Psychiatrist',
      specialtyId: 'psychiatry',
      avatar: '👨‍⚕️',
      rating: 4.8,
      reviews: 98,
      experience: '8 years',
      hospital: 'Mental Wellness Center',
      distance: '2.8 miles',
      address: '555 Mind Health Plaza',
      nextAvailable: 'Dec 22, 10:00 AM',
      availableToday: false,
      consultationFee: 175,
      languages: ['English', 'Korean'],
      education: 'Yale Medical School',
      acceptsInsurance: true
    },
    {
      id: 6,
      name: 'Dr. Robert Johnson',
      specialty: 'Orthopedic Surgeon',
      specialtyId: 'orthopedics',
      avatar: '👨‍⚕️',
      rating: 4.9,
      reviews: 267,
      experience: '20 years',
      hospital: 'Orthopedic Institute',
      distance: '3.2 miles',
      address: '888 Bone & Joint Center',
      nextAvailable: 'Today, 3:00 PM',
      availableToday: true,
      consultationFee: 180,
      languages: ['English'],
      education: 'Duke Medical School',
      acceptsInsurance: true
    }
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialtyId === selectedSpecialty;
    const matchesAvailability = selectedAvailability === 'all' || 
      (selectedAvailability === 'today' && doc.availableToday);
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesAvailability && matchesSearch;
  });

  return (
    <div className="nearby-doctors-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Find Doctors Near You</h1>
          <p>Book appointments with top-rated doctors in your area</p>
        </div>
        <div className="location-badge">
          <span>📍</span>
          <span>San Francisco, CA</span>
          <button className="change-location">Change</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="doctors-toolbar">
        <div className="search-section">
          <div className="search-box large">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, specialty, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Specialty</label>
            <select 
              value={selectedSpecialty} 
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(spec => (
                <option key={spec.id} value={spec.id}>{spec.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Availability</label>
            <select 
              value={selectedAvailability} 
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="all">Any Time</option>
              <option value="today">Available Today</option>
            </select>
          </div>

          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ▦
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>{filteredDoctors.length} doctors found</span>
        <div className="sort-dropdown">
          <span>Sort by:</span>
          <select>
            <option>Distance</option>
            <option>Rating</option>
            <option>Availability</option>
            <option>Experience</option>
          </select>
        </div>
      </div>

      {/* Doctors Grid/List */}
      <div className={`doctors-container ${viewMode}`}>
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-card-header">
              <div className="doctor-avatar-box">{doctor.avatar}</div>
              {doctor.availableToday && (
                <span className="available-badge">Available Today</span>
              )}
            </div>

            <div className="doctor-card-body">
              <h3>{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>
              
              <div className="doctor-stats">
                <span className="stat">
                  ⭐ {doctor.rating} ({doctor.reviews} reviews)
                </span>
                <span className="stat">
                  🎓 {doctor.experience}
                </span>
              </div>

              <div className="doctor-details">
                <p className="detail-item">
                  <span>🏥</span> {doctor.hospital}
                </p>
                <p className="detail-item">
                  <span>📍</span> {doctor.distance} away
                </p>
                <p className="detail-item">
                  <span>🗓️</span> Next: {doctor.nextAvailable}
                </p>
              </div>

              <div className="doctor-tags">
                {doctor.acceptsInsurance && (
                  <span className="tag insurance">✓ Accepts Insurance</span>
                )}
                {doctor.languages.map(lang => (
                  <span key={lang} className="tag language">{lang}</span>
                ))}
              </div>
            </div>

            <div className="doctor-card-footer">
              <div className="consultation-fee">
                <span className="fee-label">Consultation</span>
                <span className="fee-amount">${doctor.consultationFee}</span>
              </div>
              <div className="card-actions">
                <button className="btn btn-outline btn-sm">View Profile</button>
                <button className="btn btn-primary btn-sm">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map View Toggle */}
      <div className="map-toggle-section">
        <button className="btn btn-outline btn-lg">
          <span>🗺️</span>
          View on Map
        </button>
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No doctors found</h3>
          <p>Try adjusting your filters or search query</p>
          <button 
            className="btn btn-outline"
            onClick={() => {
              setSelectedSpecialty('all');
              setSelectedAvailability('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default NearbyDoctors;
