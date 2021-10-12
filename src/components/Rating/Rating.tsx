import Head from "next/head";

interface Props extends React.ComponentPropsWithRef<"input"> {
  name: string;
}
export const Rating = (props: Props) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <div className="rate">
        <input
          type="radio"
          id="rating-5"
          name={props.name}
          value="5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label htmlFor="rating-5" title="5 stars"></label>

        <input
          type="radio"
          id="rating-4.5"
          name={props.name}
          value="4.5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label
          className="half"
          htmlFor="rating-4.5"
          title="4 1/2 stars"
        ></label>

        <input
          type="radio"
          id="rating-4"
          name={props.name}
          value="4"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label htmlFor="rating-4" title="4 stars"></label>

        <input
          type="radio"
          id="rating-3.5"
          name={props.name}
          value="3.5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label
          className="half"
          htmlFor="rating-3.5"
          title="3 1/2 stars"
        ></label>

        <input
          type="radio"
          id="rating-3"
          name={props.name}
          value="3"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label htmlFor="rating-3" title="3 stars"></label>

        <input
          type="radio"
          id="rating-2.5"
          name={props.name}
          value="2.5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label
          className="half"
          htmlFor="rating-2.5"
          title="2 1/2 stars"
        ></label>

        <input
          type="radio"
          id="rating-2"
          name={props.name}
          value="2"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label htmlFor="rating-2" title="2 stars"></label>

        <input
          type="radio"
          id="rating-1.5"
          name={props.name}
          value="1.5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label
          className="half"
          htmlFor="rating-1.5"
          title="1 1/2 stars"
        ></label>

        <input
          type="radio"
          id="rating-1"
          name={props.name}
          value="1"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label htmlFor="rating-1" title="1 star"></label>

        <input
          type="radio"
          id="rating-0.5"
          name={props.name}
          value="0.5"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <label className="half" htmlFor="rating-0.5" title="1/2 star"></label>
      </div>
    </>
  );
};

export default Rating;
