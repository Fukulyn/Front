import { useState } from "react";
import { asyncGet, asyncPut } from "../utils/fetch";
import { api } from "../enum/api";
import "../style/Update.css";
import Nav from "./Nav";

export default function UpdateName() {
    const [selectedOption, setSelectedOption] = useState<string>("id");
    const [inputValue, setInputValue] = useState<string>("");
    const [userData, setUserData] = useState<any>({
        userName: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        Email: "",
        absences: "",
    });
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    function InputPlaceholder(): string {
        return "請輸入學生" + ("姓名");
    }

    async function FindUser() {
        const apiEndpoint = `${api.findByName}?name=${inputValue}`;

        try {
            const response = await asyncGet(apiEndpoint);

            if (response?.code === 200) {
                setUserData(response?.body);
                setShowUserData(true);
            } else {
                setShowUserData(false);
                setIsError(true)
                setMessage("學生資料未找到");
            }
        } catch (error) {
            console.error("查詢失敗:", error);
            setIsError(true)
            setMessage("請求失敗，請檢查伺服器連接");
        }
    }

    async function UpdateUserInfo() {
        Object.keys(userData).forEach((key) => {
            if (typeof userData[key] === 'string') {
                userData[key] = userData[key].trim();
            } else {
                userData[key] = '';
            }
        });

        try {
            const response = 
                await asyncPut(`${api.updateByName}?name=${inputValue}`, userData);

            if (response?.code === 200) {
                setMessage("")
                setInputValue("");
                setShowUserData(false);
            } else {
                setMessage(`伺服器錯誤: ${response?.message || "請稍後再試"}`);
            }
        } catch (error) {
            setMessage("請求失敗，請檢查伺服器連接");
        }
    }

    const userFields = [
        { label: "帳號", key: "userName" },
        { label: "姓名", key: "name" },
        { label: "科系", key: "department" },
        { label: "年級", key: "grade" },
        { label: "班級", key: "class" },
        { label: "Email", key: "Email" },
    ];

    return (
        <>
            <Nav />
            <div className="update_container">
                <h1>更新學生資料</h1>
                <form onSubmit={(e) => { e.preventDefault(); FindUser(); }}>
                    <div>
                    </div>
                    <input type="text" placeholder={InputPlaceholder()} value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                    <button type="submit">查詢學生</button>
                </form>
                {message && <p className={`message ${isError ? "error" : ""}`}>{message}</p>}
            </div>

            {showUserData && (
                <div className={`user_data_container ${showUserData ? "show" : ""}`}>
                    <h2>學生資料</h2>
                    {userFields.map(({ label, key }) => (
                        <div key={key}>
                            <label>{label}:</label>
                            <input
                                type="text"
                                value={userData[key] || ""}
                                disabled={label === "帳號" ? true : false}
                                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                            />
                        </div>
                    ))}
                    <button onClick={UpdateUserInfo}>更新資料</button>
                </div>
            )}
        </>
    );
}