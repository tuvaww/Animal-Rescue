import "../../styles/layout/popupModal.scss";

interface IPopupModalProps {
  header: string;
  body: string;
  navUrl: string;
}

export const PopupModal = (props: IPopupModalProps) => {
  return (
    <section className="popUpModalContainer">
      <article className="popUpModal">
        <div>
          <p>{props.header}</p>
        </div>
        <span>{props.body}</span>

        <div className="buttonContainer">
          <a href={props.navUrl}>
            <button type="button">Confirm</button>
          </a>
        </div>
      </article>
    </section>
  );
};
