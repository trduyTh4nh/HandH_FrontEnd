import { Close } from "@mui/icons-material";

function PopupRegister({ handleChange,switchToLogin}: any) {
  return (
    <div className="overlay w-screen h-screen absolute z-99">
      <div className="popup-register">
        <div className="btn-close">
          <Close onClick={handleChange}></Close>
        </div>
        <h1 style={{ fontWeight: "bold",paddingBottom:15 }}>Đăng ký</h1>
        <input
          className="bg-primary-grey"
          type="text"
          placeholder="Họ tên*"
          name="UsernameReText"
          id="UsernameText"
        />
        <input
          className="bg-primary-grey"
          type="text"
          placeholder="Email*"
          name="EmailReText"
          id="EmailReText"
        />
        <input
          className="bg-primary-grey"
          type="text"
          placeholder="Số điện thoại*"
          name="PhoneReText"
          id="PhoneReText"
        />
        <input
          className="bg-primary-grey"
            type="password"
          placeholder="Mật khẩu*"
          name="PassReText"
          id="PassReText"
        />
        <input
          className="bg-primary-grey"
           type="password"
          placeholder="Nhập lại mật khẩu*"
          name="RePassReText"
          id="RePassReText"
        />
            <button className="btn-continute-re">Tiếp tục</button>
         <div className="bottom-popup-login">
        <h4>Đã có tài khoản?</h4>
        <h4 onClick={switchToLogin} className="text-color-secondnary" id="text-register">
          Đăng nhập
        </h4>
      </div>
      </div>
    </div>
  );
}

export default PopupRegister;