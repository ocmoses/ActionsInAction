import SetUpPassword from "./SetUpPassword";

export default function SetUpPasswordPage({params: {link}  }) {
  
  return <SetUpPassword link={link[0]} />;
}
