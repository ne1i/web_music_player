export default function Index() {
  return (
    <div>
      <MusicPlayerWithLabel filename="knight.ogg" />
      <div className="content-center" id="buttons-container">
        <ChangeSongButton songname="knight.ogg" />
        <ChangeSongButton songname="lancer.ogg" />
        <ChangeSongButton songname="queen_boss.ogg" />
      </div>
      <form
        hx-post="/add-song"
        hx-swap="beforeend"
        hx-target="#buttons-container"
        encType="multipart/form-data"
        className="max-w-md p-6 bg-white rounded-xl shadow-md mt-10"
      >
        <label className="block mb-4" htmlFor="fileInput">
          <span className="block text-gray-700 font-medium mb-2">
            Choisir un fichier
          </span>
        </label>
        <input
          type="file"
          name="file"
          id="fileInput"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export function MusicPlayerWithLabel(props: { filename: string }) {
  return (
    <div
      className="container content-center justify-center flex"
      id="player-container"
    >
      <p>{props.filename}</p>
      <audio
        controls
        src={props.filename}
        type="audio/ogg"
        className="m-5"
      ></audio>
    </div>
  );
}

export function ChangeSongButton(props: { songname?: string }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 cursor-pointer"
      type="button"
      hx-get={`/change-audio?file=${props.songname}`}
      hx-target="#player-container"
      hx-swap="outerHTML"
    >
      {props.songname}
    </button>
  );
}

export function CreateButtonsForAllSongs() {}
