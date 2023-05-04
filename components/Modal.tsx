import { useCallback, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface modalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<modalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {

  
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  // const handleSubmit = useCallback(() => {
  //   if (disabled) {
  //     return;
  //   }

  //   onSubmit();
  // }, [disabled, onSubmit]);

  useEffect(()=>{
    if(isOpen){
        document.body.classList.add('hideScrollBar');
        console.log('isopen')
      }else{
        document.body.classList.remove('hideScrollBar');
        console.log('isClosed')
      }
  },[isOpen])

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          backgroundColor: "#1d07394f",
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: "0px",
          left: "0px",
          zIndex: 10000,
          transition: "ease-in",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;"
        }}
      >
        <div
          className="p-3"
          style={{
            backgroundColor: "#1d0739",
            width: "400px",
            borderRadius: "16px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center pb-4">
            <p className="m-0" style={{ color: "#fff", fontSize: "20px", fontWeight: 400 }}>
              {title}
            </p>
            <button type="button" style={{ all: "unset", cursor:'pointer' }}>
              <RiCloseCircleFill onClick={handleClose} className="close-button" size="25px" color="#fff" />
            </button>
          </div>
         
          {body}
          {footer}
        </div>
      </div>
    </>
  );
};

export default Modal;
