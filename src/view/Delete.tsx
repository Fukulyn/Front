import { useState } from "react";
import { asyncDelete } from "../utils/fetch";
import { api } from "../enum/api";
import "../style/Delete.css";
import Nav from "./Nav";

export default function Delete() {
    const [selectedOption, setSelectedOption] = useState<string>("id");
    const [inputValue, setInputValue] = useState<string>("");
    const [message, setMessage] = useState<string>(""); // 新增的 message 狀態
    const [isError, setIsError] = useState<boolean>(false); // 控制消息是否為錯誤

    function InputPlaceholder(): string {
        return "請輸入學生" + ("姓名");
    }

    async function DeleteUser(e: React.FormEvent) {
        e.preventDefault(); // 防止表單默認提交行為

        if (!inputValue.trim()) {
            setMessage("請在輸入框中填寫內容");
            setIsError(true);
            return;
        }

        const apiEndpoint =
                `${api.deletedByName}?name=${inputValue}`;

        try {
            const response = await asyncDelete(apiEndpoint);

            if (response?.code === 200) {
                setMessage("刪除成功！");
                setIsError(false);
                setInputValue(""); // 清空輸入框
            } else {
                setMessage("刪除失敗：無法找到學生資料");
                setIsError(true);
            }
        } catch (error) {
            setMessage("伺服器發生錯誤，請稍後再試。");
            setIsError(true);
        }
    }

    return (
        <>
            <Nav />
            <div className="delete_container">
                <h1>刪除學生</h1>
                <form onSubmit={DeleteUser}>
                    <div>
                    </div>
                    <input
                        type="text"
                        placeholder={InputPlaceholder()}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                    >
                        刪除
                    </button>
                </form>
                {message && (<p className={`message ${isError ? "error" : ""}`}>{message}</p>)}
            </div>
        </>
    );
}