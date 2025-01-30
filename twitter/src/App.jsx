import { Routes, Route } from "react-router-dom";
import {Signup,Login,Home,Feed,Explore,Notification,Message,Lists,Profiles,More,Bookmark
} from "./index";
import './App.css'
import { UserAuthContextprovider } from "./context/userauth";

function App() {
  return (
    <>
    <UserAuthContextprovider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
        <Route index element={<Feed />}/>
        </Route>
        {/* Protected Routes */}
        <Route path="/" element={<Home />}>
          {/* Nested Routes */}
          <Route path="feed" element={<Feed />} />
          <Route path="bookmarks" element={<Bookmark />} />
          <Route path="explore" element={<Explore />} />
          <Route path="notification" element={<Notification />} />
          <Route path="messages" element={<Message />} />
          <Route path="lists" element={<Lists />} />
          <Route path="profile" element={<Profiles />} />
          <Route path="more" element={<More />} />
        </Route>
      </Routes>
      </UserAuthContextprovider>
    </>
  );
}

export default App;
