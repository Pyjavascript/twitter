import { Routes, Route } from "react-router-dom";
import {Signup,Premium,Login,Home,Feed,Explore,NotificationComponent,Message,Lists,Profiles,More,Bookmark,PhoneAuth
} from "./index";
import './App.css'
import { StateProvider } from "./context/StateContext";
import { UserAuthContextProvider } from "./context/userauth";


function App() {
  return (
    <>
    <UserAuthContextProvider>
      <StateProvider>
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
          <Route path="Premium" element={<Premium />} />
          <Route path="bookmarks" element={<Bookmark />} />
          <Route path="explore" element={<Explore />} />
          <Route path="notification" element={<NotificationComponent />} />
          <Route path="messages" element={<Message />} />
          <Route path="lists" element={<Lists />} />
          <Route path="profile" element={<Profiles />} />
          <Route path="more" element={<More />} />
        </Route>
      </Routes>
      </StateProvider>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
