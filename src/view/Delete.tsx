import { api } from "../enum/api"
import { useState } from "react"
import { asyncDelete } from "../utils/fetch";
export default function Delete() {
    const [inputValue, setInputValue] = useState<string>(''); //設置狀態
    async function handleDelete() {
        const uri = `${api.deleteById}?id=${inputValue}`;
        try {
            const response = await asyncDelete(uri);
            if (response?.code === 200) {
                alert("刪除成功");
                setInputValue(""); //清空輸入盒
            }
            else {
                alert("無法找到學生ID");
            }
        } catch (error) {
            alert("server error")
        }
    }
    //頁面jsx
    return (
        <>
            <input type="text" placeholder="請輸入ID" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleDelete}>刪除</button>
        </>

    )
}