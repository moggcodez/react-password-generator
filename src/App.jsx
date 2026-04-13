import React, { useState, useEffect } from 'react';

const App = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (name, checked) => {
    setOptions(prev => ({ ...prev, [name]: checked }));
  };

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+~|}{[]:;?><,./-=';

    if (!chars) {
      setPassword('');
      return;
    }

    let pwd = '';
    for (let i = 0; i < length; i++) {
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            pwd += chars[array[0] % chars.length];
        } else {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    setPassword(pwd);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setToastMessage('✅ Password Copied Successfully!');
    
    setTimeout(() => {
        setCopied(false);
        setToastMessage('');
    }, 3000);
  };

  const calculateStrength = () => {
      let score = 0;
      if (!password) return 0;
      if (password.length > 8) score += 1;
      if (password.length >= 12) score += 1;
      if (options.uppercase && options.lowercase) score += 1;
      if (options.numbers) score += 1;
      if (options.symbols) score += 1;
      return Math.min(score, 4);
  };

  const strength = calculateStrength();
  const strengthLabels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6'];

  return (
    <>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="bg-grid"></div>

      {toastMessage && (
        <div className="toast-notification">
            {toastMessage}
        </div>
      )}

      {/* Bootstrap container for main layout, ensuring responsiveness on all devices */}
      <div className="container min-vh-100 d-flex justify-content-center align-items-center wrapper-container">
        <div className="row w-100 justify-content-center py-5">
            <div className="col-12 col-sm-11 col-md-8 col-lg-6 col-xl-5">
                
                <div className="glass-panel w-100 p-4 p-sm-5">
                    <h1 className="title text-center mb-4">Password Generator</h1>

                    <div className="output-container position-relative mb-4">
                        <input 
                            className="password-output w-100" 
                            readOnly 
                            value={password} 
                            placeholder="P4$5W0rD!" 
                        />
                        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard} title="Copy to clipboard">
                            {copied ? (
                                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            )}
                        </button>
                    </div>

                    <div className="strength-meter d-flex align-items-center justify-content-between mb-4 px-3 py-3">
                        <div className="strength-bars d-flex gap-2 flex-grow-1 me-3">
                            {[...Array(4)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`bar rounded ${i < strength ? 'filled' : ''}`}
                                    style={{ 
                                        backgroundColor: i < strength ? strengthColors[strength] : 'rgba(255,255,255,0.1)',
                                        boxShadow: i < strength ? `0 0 8px ${strengthColors[strength]}` : 'none'
                                    }}
                                />
                            ))}
                        </div>
                        <span className="strength-label text-uppercase fw-bold mb-0" style={{ color: strengthColors[strength], fontSize: '0.85rem' }}>
                            {password ? strengthLabels[strength] : 'None'}
                        </span>
                    </div>

                    <div className="control-group mb-4">
                        <div className="length-header d-flex justify-content-between align-items-center mb-3">
                            <label className="fw-semibold m-0">Character Length</label>
                            <span className="length-val m-0">{length}</span>
                        </div>
                        <input 
                            type="range" 
                            min="6" 
                            max="32" 
                            value={length} 
                            onChange={(e) => setLength(Number(e.target.value))} 
                            className="slider w-100"
                        />
                    </div>

                    <div className="options-grid d-flex flex-column gap-3 mb-4">
                        <div className="option-row d-flex justify-content-between align-items-center">
                            <span className="option-label m-0">Uppercase Letters</span>
                            <label className="toggle-switch m-0">
                                <input type="checkbox" checked={options.uppercase} onChange={(e) => handleChange('uppercase', e.target.checked)} />
                                <span className="slider-toggle"></span>
                            </label>
                        </div>
                        <div className="option-row d-flex justify-content-between align-items-center">
                            <span className="option-label m-0">Lowercase Letters</span>
                            <label className="toggle-switch m-0">
                                <input type="checkbox" checked={options.lowercase} onChange={(e) => handleChange('lowercase', e.target.checked)} />
                                <span className="slider-toggle"></span>
                            </label>
                        </div>
                        <div className="option-row d-flex justify-content-between align-items-center">
                            <span className="option-label m-0">Includes Numbers</span>
                            <label className="toggle-switch m-0">
                                <input type="checkbox" checked={options.numbers} onChange={(e) => handleChange('numbers', e.target.checked)} />
                                <span className="slider-toggle"></span>
                            </label>
                        </div>
                        <div className="option-row d-flex justify-content-between align-items-center">
                            <span className="option-label m-0">Includes Symbols</span>
                            <label className="toggle-switch m-0">
                                <input type="checkbox" checked={options.symbols} onChange={(e) => handleChange('symbols', e.target.checked)} />
                                <span className="slider-toggle"></span>
                            </label>
                        </div>
                    </div>

                    <button className="generate-btn w-100 py-3 d-flex justify-content-center align-items-center text-uppercase fw-bold border-0" onClick={generatePassword}>
                        Generate Password
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ms-2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    </button>

                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default App;
