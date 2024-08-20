import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../constans";
import {CopyToClipboard} from "react-copy-to-clipboard"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface IUrl {
  shortUrl: string;
  redirectUrl: string;
}

const ShowLink = () => {
  const { id } = useParams();
  const [url, setUrl] = useState<IUrl>();
  const [copyStatus, setCopyStatus] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000)
  }

  const fetchUrl = async (id: string) => {
    try {
      const response = await axios.get(`${ENDPOINT}/url/show-link/${id}`);
      setUrl(response.data.url);
    } catch (error) {}
  };

  useEffect(() => {
    if(!id || typeof id !== 'string'){
        setError("Invalid ID")
        return;
    }
    fetchUrl(id);
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Your Shortened Link
          </h1>
          {url ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Original Link:</h2>

                <a
                  href={url.redirectUrl}
                  className="text-blue-400 hover:text-blue-300 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.redirectUrl}
                </a>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Short Link:</h2>

                <a
                  href={`http://localhost:5173/${url.shortUrl}`}
                  className="text-green-400 hover:text-green-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  localhost:5173/{url.shortUrl}
                </a>
            <CopyToClipboard text={`http://localhost:5173/${url.shortUrl}`} onCopy={onCopyText}>
                <ContentCopyIcon className="cursor-pointer ml-8"/>
            </CopyToClipboard>
            {
                copyStatus && <span className="text-xs ml-5">Text copied to clipboard!</span>
            }
              </div>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowLink;
