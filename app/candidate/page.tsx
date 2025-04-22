import ClientSession from "@/components/candidate/getClientSession";
import { getServerSession } from "next-auth";

const CandidatePage = async () => {

    const session = await getServerSession();

    console.log(session)

    return ( 
        <div>
            hello {session?.user.name}
            <ClientSession/>
        </div>
     );
}
 
export default CandidatePage;