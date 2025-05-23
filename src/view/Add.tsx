import { api } from "../enum/api"
import { useState } from "react"
import { asyncPost } from "../utils/fetch";
import "../style/Add.css"
import Nav from './Nav'
import { resp } from "../interface/resp";
import { Student } from "../interface/Student";
export default function Add() {
  const [formData, setFormData] = useState<Student>({
    userName: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
  });

  const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);

    const Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault(); // 防止表單預設提交行為

        try {
            const response:resp<Student> = await asyncPost(api.insertOne, formData);
            if (response?.code === 200) {
                setMessage("新增成功");
                setIsError(false)
                setFormData({
                    userName: "",
                    name: "",
                    department: "",
                    grade: "",
                    class: "",
                    Email: "",
                });
            } else {
                setMessage(`新增失敗: ${response?.message || "請稍後再試"}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage("請求失敗，請檢查伺服器連接");
            setIsError(true);
        }
    };

    const formFields = [
        { name: "userName", label: "使用者名稱", type: "text" },
        { name: "name", label: "姓名", type: "text" },
        { name: "department", label: "系級", type: "text" },
        { name: "grade", label: "年級", type: "text" },
        { name: "class", label: "班級", type: "text" },
        { name: "Email", label: "電子郵件", type: "Email" },
      ];
      return (
        <>
            <Nav />
            <div className="add_container">
                <h1>新增學生</h1>
            <form onSubmit={Submit}>
                {formFields.map((field) => (
                <div className="txt_field" key={field.name}>
                    <input
                    type="text"
                    placeholder=" "
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={Change} 
                    required
                    />
                    <span></span>
                    <label>{field.label}</label>
                </div>
                ))}
                <button type="submit">新增</button>
                <p className={`message ${isError ? 'error' : ''}`}>{message}</p>
            </form>
            </div>
        </>
    );
}

