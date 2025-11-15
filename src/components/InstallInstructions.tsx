import React, { useState } from 'react';

export const InstallInstructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  React.useEffect(() => {
    // Detectar o sistema operacional
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);
    setIsAndroid(/android/i.test(userAgent));
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 1001,
          background: '#87CEEB',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 20px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        📱 Instalar App
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ✕
        </button>

        <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '24px' }}>
          📱 Como Instalar no Celular
        </h2>

        {isIOS ? (
          <div>
            <h3 style={{ color: '#87CEEB', marginTop: '20px', marginBottom: '10px' }}>
              📱 iPhone/iPad (Safari)
            </h3>
            <ol style={{ lineHeight: '2', color: '#555', paddingLeft: '20px' }}>
              <li>Abra este site no navegador <strong>Safari</strong> (não use Chrome)</li>
              <li>Toque no botão <strong>Compartilhar</strong> (quadrado com seta para cima) na parte inferior da tela</li>
              <li>Role a lista para baixo e procure por <strong>"Adicionar à Tela de Início"</strong></li>
              <li>Toque em <strong>"Adicionar à Tela de Início"</strong></li>
              <li>Personalize o nome se quiser e toque em <strong>"Adicionar"</strong></li>
              <li>Pronto! O app aparecerá na sua tela inicial! 🎉</li>
            </ol>
            <div style={{ 
              background: '#E3F2FD', 
              padding: '15px', 
              borderRadius: '10px', 
              marginTop: '15px',
              fontSize: '14px',
              color: '#555'
            }}>
              💡 <strong>Dica:</strong> Se não aparecer a opção, certifique-se de estar usando o Safari, não o Chrome.
            </div>
          </div>
        ) : isAndroid ? (
          <div>
            <h3 style={{ color: '#87CEEB', marginTop: '20px', marginBottom: '10px' }}>
              🤖 Android (Chrome)
            </h3>
            <ol style={{ lineHeight: '2', color: '#555', paddingLeft: '20px' }}>
              <li>Abra este site no navegador <strong>Chrome</strong></li>
              <li>Toque no menu (três pontinhos <strong>⋮</strong>) no canto superior direito</li>
              <li>Procure por <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong></li>
              <li>Toque na opção e depois em <strong>"Instalar"</strong> ou <strong>"Adicionar"</strong></li>
              <li>Pronto! O app aparecerá na sua tela inicial! 🎉</li>
            </ol>
            <div style={{ 
              background: '#E3F2FD', 
              padding: '15px', 
              borderRadius: '10px', 
              marginTop: '15px',
              fontSize: '14px',
              color: '#555'
            }}>
              💡 <strong>Dica:</strong> Às vezes o Chrome mostra um banner na parte inferior da tela perguntando se você quer instalar o app. Toque em "Instalar"!
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ color: '#87CEEB', marginTop: '20px', marginBottom: '10px' }}>
              📱 Instruções Gerais
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', marginTop: '15px' }}>🤖 Android:</h4>
              <ol style={{ lineHeight: '2', color: '#555', paddingLeft: '20px' }}>
                <li>Abra no navegador <strong>Chrome</strong></li>
                <li>Menu (⋮) → <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong></li>
                <li>Confirme a instalação</li>
              </ol>
            </div>
            <div>
              <h4 style={{ color: '#333', marginTop: '15px' }}>📱 iPhone/iPad:</h4>
              <ol style={{ lineHeight: '2', color: '#555', paddingLeft: '20px' }}>
                <li>Abra no navegador <strong>Safari</strong></li>
                <li>Botão Compartilhar → <strong>"Adicionar à Tela de Início"</strong></li>
                <li>Confirme a adição</li>
              </ol>
            </div>
          </div>
        )}

        <div style={{ 
          background: '#FFF3E0', 
          padding: '15px', 
          borderRadius: '10px', 
          marginTop: '20px',
          fontSize: '14px',
          color: '#555'
        }}>
          ⚠️ <strong>Importante:</strong> Para instalar, o app precisa estar publicado online (não funciona em localhost). 
          Publique em Netlify, Vercel ou outro serviço gratuito primeiro!
        </div>
      </div>
    </div>
  );
};

