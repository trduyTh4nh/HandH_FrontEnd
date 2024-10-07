import { Close } from "@mui/icons-material";

function PopupComponent({ handleChange,switchToRegister }: any) {
  return (
    <div className="overlay">

    <div className="popup-login">
      <div className='btn-close'><Close  onClick={handleChange}></Close></div>
      <h1 style={{ fontWeight: "bold" }}>Đăng nhập</h1>
      <input
        className="bg-primary-grey"
        type="text"
        placeholder="Email hoặc số điện thoại"
        name="emailText"
        id="emailText"
      />
      <input
        className="bg-primary-grey"
        type="password"
        placeholder="Mật khẩu"
        name="passText"
        id="passText"
      />

      <button className="btn-continute">Tiếp tục</button>
      <h3 className="or-text">Hoặc</h3>
      <button className="btn-continute-with-google">
        <img className="h-8 w-auto" src="\src\assets\image\logo_google.png"
                alt="Logo"/>
        Tiếp tục với Google</button>
      <div className="bottom-popup-login">
        <h4>Chưa có tài khoản?</h4>
        <h4 onClick={switchToRegister} className="text-color-secondnary" id="text-register">
          Đăng ký
        </h4>
      </div>
    </div>
    </div>
  );
}

export default PopupComponent;