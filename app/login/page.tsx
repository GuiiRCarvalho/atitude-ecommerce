'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error(`Erro do servidor (não JSON). Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'E-mail ou senha incorretos');
      }

      // Save token to localStorage (can also be saved to cookies/context)
      localStorage.setItem('atitude67_token', data.token);

      // Redirect to home
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="auth-container">
      <Link href="/" className="back-link">
        <ArrowLeft size={20} />
        Voltar para a loja
      </Link>

      <div className="auth-box">
        <h2>BEM-VINDO DE VOLTA</h2>
        <p>Acesse sua conta para ver seus pedidos e ofertas exclusivas.</p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            <Link href="#" className="forgot-password">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OU</span>
        </div>

        <p className="auth-switch">
          Ainda não tem uma conta? <Link href="/cadastro">Criar conta</Link>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .auth-container {
          min-height: calc(100vh - 160px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          position: relative;
        }

        .back-link {
          position: absolute;
          top: 40px;
          left: 60px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 14px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--text-main);
        }

        .auth-box {
          background: var(--white);
          width: 100%;
          max-width: 440px;
          padding: 48px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          animation: fadeInUp 0.6s ease forwards;
        }

        .auth-box h2 {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
          text-align: center;
        }

        .auth-box p {
          color: var(--text-muted);
          font-size: 14px;
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-group input {
          padding: 14px 16px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-family: inherit;
          font-size: 15px;
          transition: border-color 0.2s;
          background: var(--bg-color);
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--text-main);
          background: var(--white);
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          text-align: center;
          border: 1px solid #ffcdd2;
        }

        .forgot-password {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: none;
          text-align: right;
          margin-top: 4px;
        }

        .forgot-password:hover {
          color: var(--text-main);
        }

        .auth-button {
          margin-top: 8px;
          background: var(--text-main);
          color: var(--white);
          border: none;
          padding: 16px;
          font-family: inherit;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.5px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .auth-button:disabled {
          background: var(--text-muted);
          cursor: not-allowed;
          transform: none;
        }

        .auth-button:not(:disabled):hover {
          background: #000;
          transform: translateY(-2px);
        }

        .auth-divider {
          margin: 32px 0;
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--text-muted);
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }

        .auth-divider span {
          padding: 0 16px;
          font-size: 12px;
          font-weight: 600;
        }

        .auth-switch {
          margin-bottom: 0 !important;
        }

        .auth-switch a {
          color: var(--text-main);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .back-link {
            top: 20px;
            left: 20px;
          }
          .auth-box {
            padding: 32px 24px;
            border: none;
            box-shadow: none;
            background: transparent;
          }
        }
      `}} />
    </div>
  );
}
