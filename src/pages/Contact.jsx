import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // E-posta için basit regex kontrolü
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleTextChange(e) {
    const { name, value } = e.target;
    const onlyLetters = value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, "");
    if (value !== onlyLetters) {
      setError((prev) => ({ ...prev, [name]: "Lütfen sadece harf giriniz." }));
    } else {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
    setForm((s) => ({ ...s, [name]: onlyLetters }));
  }

  function handlePhoneChange(e) {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, 11);
    if (value !== onlyNumbers) {
      setError((prev) => ({
        ...prev,
        [name]: "Telefon numarası sadece rakamlardan oluşmalı ve en fazla 11 karakter olmalı.",
      }));
    } else {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
    setForm((s) => ({ ...s, [name]: onlyNumbers }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    let hasError = false;
    let newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = "Ad alanı zorunludur.";
      hasError = true;
    }
    if (!form.lastName) {
      newErrors.lastName = "Soyad alanı zorunludur.";
      hasError = true;
    }
    if (!form.email) {
      newErrors.email = "E-posta alanı zorunludur.";
      hasError = true;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
      hasError = true;
    }
    if (!form.phone) {
      newErrors.phone = "Telefon numarası zorunludur.";
      hasError = true;
    } else if (form.phone.length !== 11) {
      newErrors.phone = "Telefon numarası 11 haneli olmalıdır.";
      hasError = true;
    }
    if (!form.message) {
      newErrors.message = "Mesaj alanı boş bırakılamaz.";
      hasError = true;
    }

    if (hasError) {
      setError(newErrors);
      return;
    }

    setError({});
    setSuccessMsg("Mesajınız başarıyla gönderildi! Teşekkür ederiz.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  }

  const inputStyle = {
    borderRadius: "0.5rem",
    border: "none",
    boxShadow: "0 2px 8px rgba(13,110,253,0.15)",
    transition: "box-shadow 0.3s ease",
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = "0 0 12px 3px rgba(13,110,253,0.5)";
    e.target.style.outline = "none";
  };

  const handleBlur = (e) => {
    e.target.style.boxShadow = "0 2px 8px rgba(13,110,253,0.15)";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100"
      style={{
        paddingTop: "50px",
        backgroundColor: "#e9f0ff",
        width: "100%",
        boxSizing: "border-box",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow-lg"
        style={{ maxWidth: 550, width: "100%" }}
        noValidate
        aria-label="İletişim formu"
      >
        <h2 className="mb-4 text-center fw-bold" style={{ color: "#0d6efd" }}>
          İLETİŞİM
        </h2>

        {successMsg && (
          <div
            className="alert alert-success text-center mb-4"
            role="alert"
            aria-live="polite"
            style={{ fontWeight: "600", borderRadius: "0.5rem" }}
          >
            {successMsg}
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            className="form-control form-control-lg"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
            inputMode="text"
            style={inputStyle}
            aria-describedby="firstNameHelp"
            aria-invalid={!!error.firstName}
          />
          {error.firstName && (
            <div
              id="firstNameHelp"
              className="form-text text-danger fw-semibold"
              role="alert"
            >
              {error.firstName}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            className="form-control form-control-lg"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
            inputMode="text"
            style={inputStyle}
            aria-describedby="lastNameHelp"
            aria-invalid={!!error.lastName}
          />
          {error.lastName && (
            <div id="lastNameHelp" className="form-text text-danger fw-semibold" role="alert">
              {error.lastName}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            placeholder="E-posta"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
            style={inputStyle}
            aria-describedby="emailHelp"
            aria-invalid={!!error.email}
          />
          {error.email && (
            <div id="emailHelp" className="form-text text-danger fw-semibold" role="alert">
              {error.email}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control form-control-lg"
            placeholder="Telefon Numarası"
            value={form.phone}
            onChange={handlePhoneChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            autoComplete="off"
            inputMode="numeric"
            maxLength={11}
            style={inputStyle}
            aria-describedby="phoneHelp"
            aria-invalid={!!error.phone}
          />
          {error.phone && (
            <div id="phoneHelp" className="form-text text-danger fw-semibold" role="alert">
              {error.phone}
            </div>
          )}
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            className="form-control form-control-lg"
            placeholder="Mesajınız"
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={5}
            required
            style={inputStyle}
            aria-describedby="messageHelp"
            aria-invalid={!!error.message}
          ></textarea>
          {error.message && (
            <div id="messageHelp" className="form-text text-danger fw-semibold" role="alert">
              {error.message}
            </div>
          )}
        </div>

        <div
          className="d-flex gap-3 flex-wrap justify-content-center"
          style={{ marginTop: "1rem" }}
        >
          <button
            type="reset"
            className="btn btn-outline-primary btn-lg flex-grow-1"
            onClick={() => {
              setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
              setError({});
              setSuccessMsg("");
            }}
            style={{ cursor: "pointer", minWidth: 140 }}
          >
            Temizle
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg flex-grow-1"
            style={{ cursor: "pointer", minWidth: 140 }}
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
