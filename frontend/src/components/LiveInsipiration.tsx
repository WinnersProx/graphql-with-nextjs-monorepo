
import { useQuery } from "react-apollo";
import { fetchInspirationQuery } from "../utils/queries";

export default function LiveInspiration ({ data, loading, error }: any) {

    if(loading) return <div>Loading quote...</div>

    if(error) return <div>Something went wrong</div>

    return (<div style={{ marginTop: 10 }}>
        <br />
        <div>
            {data?.getInspired.quote}
        </div>
        <div> By <strong>{ data?.getInspired.author}</strong> </div>
    </div>)
}