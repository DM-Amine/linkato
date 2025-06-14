import { Button } from "../ui/button";
import Link from "next/link";

const SignInButton = () => {
    return (
        <Button variant="default" className="text-xs " >
            <Link href="/auth/signup" >
           
        Sign up
        </Link>
        </Button>
    );
}
export default SignInButton;