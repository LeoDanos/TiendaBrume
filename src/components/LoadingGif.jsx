import loadingGif from '../assets/loading.gif';

export const LoadingGif = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            zIndex: 9999,
            width: '100%',
            height: '100%',
          }}> 
        <img src={loadingGif} height={180} alt="Cargando..." />
      </div>
    )
}

