import React, { useState } from 'react';
import type { ClothingItem, Category } from '../types';
import { colorHarmonyList, getColorHex } from '../utils';

interface Props {
  clothes: ClothingItem[];
  onAdd: (item: ClothingItem) => void;
  onRemove: (id: string) => void;
}

const Wardrobe: React.FC<Props> = ({ clothes, onAdd, onRemove }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('top');
  const [color, setColor] = useState(colorHarmonyList[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: Date.now().toString(),
      name,
      category,
      color,
    });
    
    setName('');
    setShowForm(false);
  };

  return (
    <div className="flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>My Closet ({clothes.length})</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel p-4 mb-6 flex-col gap-4 animate-fade-in" style={{ padding: '20px' }}>
          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Item Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Casual Striped Shirt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex gap-4">
            <div style={{ flex: 1 }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Category</label>
              <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="outerwear">Outerwear</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Color</label>
              <select className="input-field" value={color} onChange={(e) => setColor(e.target.value)}>
                {colorHarmonyList.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '8px' }}>Save to Closet</button>
        </form>
      )}

      <div className="flex-col gap-4">
        {clothes.length === 0 ? (
          <div className="text-center text-muted" style={{ padding: '40px 0' }}>
            <p>Your closet is empty.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>Add some clothes to get recommendations!</p>
          </div>
        ) : (
          clothes.map(item => (
            <div key={item.id} className="glass-panel flex items-center justify-between" style={{ padding: '16px' }}>
              <div className="flex items-center gap-4">
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: getColorHex(item.color),
                  border: item.color.toLowerCase() === 'black' ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}></div>
                <div>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                    {item.color} • {item.category}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '8px' }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wardrobe;
