import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/studentSlice";
import { studentApi } from "./studenApi";



   export const checkAuth = async () => {
   
      try {
         const dispatch = useDispatch();
        const { data, ok } = await studentApi.me("/auth/students/me");
        if (!ok || !data.success){
            const { data, ok } = await studentApi.me("/auth/parents/me");
            if (!ok || !data.success) return;
            dispatch(setUser(data.user));
        }
        dispatch(setUser(data.user));
      } catch (err) {
        console.log(err);
      }
    };