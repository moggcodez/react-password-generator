import React, { useState } from 'react';

const App = () => {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setOptions({ ...options, [name]: checked });
  };

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+[]{}';

    if (!chars) return setPassword('❗ Select options');

    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pwd);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('✅ Copied!');
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Password Generator</h2>

        <label>Length</label>
        <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />

        <div className="options">
          <label><input type="checkbox" name="uppercase" checked={options.uppercase} onChange={handleChange} /> Uppercase</label>
          <label><input type="checkbox" name="lowercase" checked={options.lowercase} onChange={handleChange} /> Lowercase</label>
          <label><input type="checkbox" name="numbers" checked={options.numbers} onChange={handleChange} /> Numbers</label>
          <label><input type="checkbox" name="symbols" checked={options.symbols} onChange={handleChange} /> Symbols</label>
        </div>

        <button onClick={generatePassword}>Generate</button>
        <input readOnly value={password} />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  );
};

export default App;
