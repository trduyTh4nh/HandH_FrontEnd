import ModalImage from "react-modal-image";
import CircleIcon from "@mui/icons-material/Circle";
import { IBlogPost } from "@/types/blog.type";

const PostAbout: React.FC = () => {
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-header-right">
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/sea-avatar-wayofwater-gallery06_a360a29e.jpeg?region=1%2C0%2C1298%2C730"
            alt="example image"
            className="circle-image"
          />

          <div className="post-header-title">
            <p style={{ fontSize: 20, fontWeight: "bold" }}>Tác giả</p>
            <div className="post-header-title-daypost">
              <p style={{ fontSize: 16 }}>10/10/2024</p>
              <CircleIcon
                style={{ color: "black", fontSize: 6, margin: "0 5px" }}
              />

              <p style={{ fontSize: 16 }}>5:24</p>
            </div>
          </div>
        </div>
        <div className="post-header-left" style={{ cursor: "pointer" }}></div>
      </div>
      <div className="post-title">
        <p>
          Lorem ipsum dolor sit amet consectetur. Sit facilisis eros sed pretium
          egestas morbi scelerisque. Posuere neque blandit eu tortor dui est
          duis. Aenean varius ultricies pretium posuere sollicitudin nec viverra
          purus quis. Gravida vulputate enim velit ornare consectetur. Integer
          ac cursus aliquam id vulputate tortor proin. In elit nam aliquet
          tortor diam.
        </p>
      </div>
      <div className="post-image">
        <ModalImage
          small="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
          large="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
          alt="Post"
        />
        {/* <img src="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
                                    
                                /> */}
      </div>
    </div>
  );
};
export default PostAbout;
