import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");

  // Sadece harf girilmesine izin veren fonksiyon
  function handleTextChange(e) {
    const { name, value } = e.target;
    const onlyLetters = value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, "");
    if (value !== onlyLetters) {
      setError("Lütfen sadece harf giriniz.");
    } else {
      setError("");
    }
    setForm((s) => ({ ...s, [name]: onlyLetters }));
  }

  // Sadece rakam girilmesine izin veren fonksiyon ve max 11 karakter
  function handlePhoneChange(e) {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "").slice(0, 11);
    if (value !== onlyNumbers) {
      setError("Telefon numarası sadece rakamlardan oluşmalı ve en fazla 11 karakter olmalı.");
    } else {
      setError("");
    }
    setForm((s) => ({ ...s, [name]: onlyNumbers }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.phone.length !== 11) {
      setError("Telefon numarası 11 haneli olmalıdır.");
      return;
    }
    alert("Mesajınız gönderildi!");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setError("");
  }

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light" style={{ paddingTop: "50px" }}>
      <form className="p-4 border rounded shadow bg-white w-100" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">İLETİŞİM</h2>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleTextChange}
            required
            autoComplete="off"
            inputMode="text"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleTextChange}
            required
            autoComplete="off"
            inputMode="text"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="E-posta"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Telefon Numarası"
            value={form.phone}
            onChange={handlePhoneChange}
            required
            autoComplete="off"
            inputMode="numeric"
            maxLength={11}
          />
        </div>

          <div className="mb-3">
          <textarea
            name="message"
            className="form-control"
            placeholder="Mesajınız"
            value={form.message}
            onChange={handleChange} // Sadece burada değişiklik yapıldı
            rows="5"
            required
          ></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="reset"
            className="btn btn-outline-secondary"
            onClick={() => {
              setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
              setError("");
            }}
          >
            Temizle
          </button>
          <button type="submit" className="btn btn-primary">
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
