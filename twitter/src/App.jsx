import { Routes, Route } from "react-router-dom";
import {Signup,Login,Home,Feed,Explore,Notification,Message,Lists,Profiles,More,Bookmark,PhoneAuth
} from "./index";
import './App.css'
import { UserAuthContextProvider } from "./context/userauth";


function App() {
  return (
    <>
    <UserAuthContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phoneauth" element={<PhoneAuth />} />
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
      </UserAuthContextProvider>
    </>
  );
}

export default App;
