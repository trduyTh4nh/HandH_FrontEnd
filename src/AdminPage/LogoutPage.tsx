import { logout } from "@/apis/user/user-repo";
import { UserContext } from "@/components/contexts/UserContext";
import { Button } from "@/components/ui/button";
import ErrorView from "@/components/widget/Error.widget";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { error } from "console";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { user, setUser } = useContext(UserContext);
  const { toast } = useToast();
  const [task, setTask] = useState({
    message: null,
    shown: false,
  });
  const navigate = useNavigate();
  const handleLogOut = async () => {
    setTask({
      message: "Đang đăng xuất...",
      shown: true,
    });
    const res = await logout();
    if (res instanceof AxiosError) {
      console.log(res);
      //@ts-ignore
      if (res.response.data.message != "invalid signature") {
        console.log(res);
        toast({
          title: `Lỗi ${res.code}`,
          description: `Lỗi hệ thống: ${res.message}`,
        });
        setTask({
          message: "Đang đăng xuất...",
          shown: false,
        });
        return;
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTask({
      message: "Đang đăng xuất...",
      shown: false,
    });
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống",
    });
    navigate("/");
  };
  return (
    <ErrorView
      className="h-screen"
      title="Đăng xuất?"
      message={`Bạn có muốn đăng xuất khỏi tài khoản '${user.name}' không? Bạn sẽ mất quyền quản trị viên khi đăng xuất.`}
      icon="logout"
    >
      <div className="flex gap-2">
        <Button onClick={handleLogOut} disabled={task.shown}>
          {task.shown ? task.message : "Đồng ý"}
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Huỷ
        </Button>
      </div>
    </ErrorView>
  );
}
