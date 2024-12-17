import "../style/Navigation.css";

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-title">
                <a href="/" className="home-link">學生管理系統</a>
            </div>
            <div className="nav-links">
                <a href="?#/add" className="nav-button">新增學生</a>
                <a href="?#/delete" className="nav-button">刪除學生</a>
                <a href="?deleteOption=on#/update" className="nav-button">更新學生</a>
            </div>
        </nav>
    );
  }