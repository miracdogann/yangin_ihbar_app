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

  // E-posta için güçlü regex kontrolü
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    } else {
      // Email format kontrolü
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Geçerli bir e-posta adresi giriniz.";
        hasError = true;
      } else {
        // Email harf ile başlama kontrolü
        const emailStart = form.email.charAt(0);
        if (!/[a-zA-ZğüşöçıİĞÜŞÖÇ]/.test(emailStart)) {
          newErrors.email = "E-posta adresi harf ile başlamalıdır.";
          hasError = true;
        } else {
          // Ek güvenlik kontrolleri
          const email = form.email.toLowerCase();
          const domain = email.split('@')[1];
          
          // Sadece güvenilir domain'lere izin ver (whitelist)
          const allowedDomains = [
            // Popüler e-posta sağlayıcıları
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
            'yandex.com', 'mail.ru', 'protonmail.com', 'icloud.com', 'aol.com',
            'msn.com', 'me.com', 'mac.com', 'googlemail.com',
            
            // Yahoo alt domain'leri
            'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.it', 'yahoo.es', 'yahoo.ca',
            'yahoo.com.tr', 'yahoo.com.au', 'yahoo.co.jp', 'yahoo.co.kr',
            
            // Hotmail alt domain'leri
            'hotmail.co.uk', 'hotmail.fr', 'hotmail.de', 'hotmail.it', 'hotmail.es',
            'hotmail.com.tr', 'hotmail.com.au',
            
            // Outlook alt domain'leri
            'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.it', 'outlook.es',
            'outlook.com.tr', 'outlook.com.au',
            
            // Live alt domain'leri
            'live.co.uk', 'live.fr', 'live.de', 'live.it', 'live.es',
            'live.com.tr', 'live.com.au',
            
            // Eğitim kurumları
            'edu.tr', 'ogr.edu.tr', 'ac.kr', 'ac.jp', 'ac.uk', 'edu.au', 'edu.sg',
            'edu.us', 'edu.ca', 'edu.de', 'edu.fr', 'edu.it', 'edu.es',
            
            // Resmi kurumlar
            'gov.tr', 'gov.uk', 'gov.au', 'gov.ca', 'gov.de', 'gov.fr',
            'gov.us', 'gov.it', 'gov.es', 'gov.jp', 'gov.kr',
            
            // Türk üniversiteleri (popüler olanlar)
            'metu.edu.tr', 'itu.edu.tr', 'hacettepe.edu.tr', 'ankara.edu.tr',
            'istanbul.edu.tr', 'ege.edu.tr', 'dokuzeylul.edu.tr', 'mcbu.edu.tr',
            'sakarya.edu.tr', 'kocaeli.edu.tr', 'balikesir.edu.tr', 'trakya.edu.tr'
          ];
          
          if (!allowedDomains.includes(domain)) {
            newErrors.email = "Sadece güvenilir e-posta sağlayıcıları kabul edilir (Gmail, Yahoo, Hotmail, vb.).";
            hasError = true;
          }
          
          // Çok uzun e-posta adreslerini engelle
          if (email.length > 254) {
            newErrors.email = "E-posta adresi çok uzun.";
            hasError = true;
          }
        }
      }
    }
    if (!form.phone) {
      newErrors.phone = "Telefon numarası zorunludur.";
      hasError = true;
    } else if (form.phone.length !== 11) {
      newErrors.phone = "Telefon numarası 11 haneli olmalıdır.";
      hasError = true;
    } else if (form.phone.charAt(0) !== '0') {
      newErrors.phone = "Telefon numarası 0 ile başlamalıdır.";
      hasError = true;
    }
    if (!form.message) {
      newErrors.message = "Mesaj alanı boş bırakılamaz.";
      hasError = true;
    } else if (form.message.length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır.";
      hasError = true;
    } else if (form.message.length > 1000) {
      newErrors.message = "Mesaj en fazla 1000 karakter olabilir.";
      hasError = true;
    } else {
      // Zararlı içerik kontrolü
      const suspiciousPatterns = [
        /<script/i, /javascript:/i, /on\w+\s*=/i, /data:text\/html/i,
        /vbscript:/i, /<iframe/i, /<object/i, /<embed/i
      ];
      
      if (suspiciousPatterns.some(pattern => pattern.test(form.message))) {
        newErrors.message = "Mesajınızda geçersiz içerik bulundu.";
        hasError = true;
      }
    }

    if (hasError) {
      setError(newErrors);
      return;
    }

    setError({});
    
    // Form verilerini güvenli şekilde işle
    const sanitizedData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.toLowerCase().trim(),
      phone: form.phone.trim(),
      message: form.message.trim()
    };
    
    // Rate limiting kontrolü (basit)
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    const now = Date.now();
    if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 dakika
      setError({ general: "Çok hızlı gönderim yapıyorsunuz. Lütfen 1 dakika bekleyin." });
      return;
    }
    
    // Başarılı gönderim
    localStorage.setItem('lastFormSubmission', now.toString());
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

        {error.general && (
          <div
            className="alert alert-danger text-center mb-4"
            role="alert"
            aria-live="polite"
            style={{ fontWeight: "600", borderRadius: "0.5rem" }}
          >
            {error.general}
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
            placeholder="0xxxxxxxxxx (11 haneli)"
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