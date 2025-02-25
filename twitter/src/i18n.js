import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    lng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    resources: {
      en: {
        translation: {
          signup: {
            title: "Happening now",
            subtitle: "Join Twitter today",
            username: "Username",
            fullname: "Enter Full Name",
            email: "Email Address",
            password: "Enter Password",
            signup: "Sign Up",
            google: "Sign Up with Google",
            haveaccount: "Already have an account?",
            login: "Login",
          },
          sidebar: {
            home: "Home",
            explore: "Explore",
            notifications: "Notifications",
            messages: "Messages",
            bookmarks: "Bookmarks",
            lists: "Lists",
            premium: "Premium",
            profile: "Profile",
            more: "More",
            logout: "Logout",
          },
          tweetBox: {
            placeholder: "What's happening?",
            tweetButton: "Tweet",
            uploading: "Uploading Image...",
          },
          post: {
            like: "Like",
            reply: "Reply",
            retweet: "Retweet",
            share: "Share",
          },
        },
      },
      fr: {
        translation: {
          signup: {
            title: "En cours",
            subtitle: "Rejoignez Twitter aujourd'hui",
            username: "Nom d'utilisateur",
            fullname: "Entrez le nom complet",
            email: "Adresse e-mail",
            password: "Entrez le mot de passe",
            signup: "S'inscrire",
            google: "S'inscrire avec Google",
            haveaccount: "Vous avez déjà un compte ?",
            login: "Se connecter",
          },

          sidebar: {
            home: "Accueil",
            explore: "Explorer",
            notifications: "Notifications",
            messages: "Messages",
            bookmarks: "Signets",
            lists: "Listes",
            premium: "Premium",
            profile: "Profil",
            more: "Plus",
            logout: "Se déconnecter",
          },
          tweetBox: {
            placeholder: "Quoi de neuf?",
            tweetButton: "Tweeter",
            uploading: "Téléchargement de l'image...",
          },
          post: {
            like: "J'aime",
            reply: "Répondre",
            retweet: "Retweeter",
            share: "Partager",
          },
        },
      },
      hi: {
        translation: {
          signup: {
            title: "अभी हो रहा है",
            subtitle: "आज ही ट्विटर से जुड़ें",
            username: "उपयोगकर्ता नाम",
            fullname: "पूरा नाम दर्ज करें",
            email: "ईमेल पता",
            password: "पासवर्ड दर्ज करें",
            signup: "साइन अप करें",
            google: "गूगल के साथ साइन अप करें",
            haveaccount: "पहले से एक खाता है?",
            login: "लॉगिन करें",
          },

          sidebar: {
            home: "होम",
            explore: "अन्वेषण करें",
            notifications: "सूचनाएँ",
            messages: "संदेश",
            bookmarks: "बुकमार्क",
            lists: "सूचियाँ",
            premium: "प्रीमियम",
            profile: "प्रोफ़ाइल",
            more: "अधिक",
            logout: "लॉग आउट",
          },
          tweetBox: {
            placeholder: "क्या हो रहा है?",
            tweetButton: "ट्वीट",
            uploading: "छवि अपलोड हो रहा है...",
          },
          post: {
            like: "पसंद करें",
            reply: "उत्तर दें",
            retweet: "रीट्वीट",
            share: "साझा करें",
          },
        },
      },
      zh: {
        translation: {
          signup: {
            title: "正在发生",
            subtitle: "立即加入 Twitter",
            username: "用户名",
            fullname: "输入全名",
            email: "电子邮件地址",
            password: "输入密码",
            signup: "注册",
            google: "使用 Google 注册",
            haveaccount: "已经有账户？",
            login: "登录",
          },

          sidebar: {
            home: "主页",
            explore: "探索",
            notifications: "通知",
            messages: "消息",
            bookmarks: "书签",
            lists: "列表",
            premium: "高级",
            profile: "个人资料",
            more: "更多",
            logout: "登出",
          },
          tweetBox: {
            placeholder: "发生了什么？",
            tweetButton: "推文",
            uploading: "图片上传中...",
          },
          post: {
            like: "点赞",
            reply: "回复",
            retweet: "转推",
            share: "分享",
          },
        },
      },
      es: {
        translation: {
          signup: {
            title: "Ocurriendo ahora",
            subtitle: "Únete a Twitter hoy",
            username: "Nombre de usuario",
            fullname: "Ingresa tu nombre completo",
            email: "Dirección de correo electrónico",
            password: "Ingresa la contraseña",
            signup: "Regístrate",
            google: "Regístrate con Google",
            haveaccount: "¿Ya tienes una cuenta?",
            login: "Iniciar sesión",
          },
          sidebar: {
            home: "Inicio",
            explore: "Explorar",
            notifications: "Notificaciones",
            messages: "Mensajes",
            bookmarks: "Marcadores",
            lists: "Listas",
            premium: "Premium",
            profile: "Perfil",
            more: "Más",
            logout: "Cerrar sesión",
          },
          tweetBox: {
            placeholder: "¿Qué está pasando?",
            tweetButton: "Twittear",
            uploading: "Subiendo imagen...",
          },
          post: {
            like: "Me gusta",
            reply: "Responder",
            retweet: "Retwittear",
            share: "Compartir",
          },
        },
      },
      pt: {
        translation: {
          signup: {
            title: "Acontecendo agora",
            subtitle: "Junte-se ao Twitter hoje",
            username: "Nome de usuário",
            fullname: "Digite o nome completo",
            email: "Endereço de e-mail",
            password: "Digite a senha",
            signup: "Inscrever-se",
            google: "Inscrever-se com o Google",
            haveaccount: "Já tem uma conta?",
            login: "Entrar",
          },
          sidebar: {
            home: "Início",
            explore: "Explorar",
            notifications: "Notificações",
            messages: "Mensagens",
            bookmarks: "Favoritos",
            lists: "Listas",
            premium: "Premium",
            profile: "Perfil",
            more: "Mais",
            logout: "Sair",
          },
          tweetBox: {
            placeholder: "O que está acontecendo?",
            tweetButton: "Tweetar",
            uploading: "Carregando imagem...",
          },
          post: {
            like: "Curtir",
            reply: "Responder",
            retweet: "Retweetar",
            share: "Compartilhar",
          },
        },
      },
    },
  });

export default i18n;
