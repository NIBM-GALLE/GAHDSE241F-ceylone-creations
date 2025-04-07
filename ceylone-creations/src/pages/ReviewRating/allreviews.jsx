import { useParams } from "react-router-dom";
import ReviewSection from "./reviewsection";// adjust path as needed

export default function FullReviewPage() {
  const { productId } = useParams();

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Reviews</h2>
      <ReviewSection productId={productId} showAll={true} />
    </div>
  );
}
