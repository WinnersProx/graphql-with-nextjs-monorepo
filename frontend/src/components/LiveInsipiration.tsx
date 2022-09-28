import gql from "graphql-tag"
import { useQuery } from "react-apollo";
import { getAuthToken } from "../utils";


const fetchInspirationQuery = gql`
query getInspiredQuery {
    getInspired {
      id
      author
      quote
    }
}
`;

export default function LiveInspiration () {
    const { data, loading, error } = useQuery(fetchInspirationQuery);

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