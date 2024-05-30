import TwitterIcon from '@/components/icons/Twitter';
import GitHubIcon from '@/components/icons/GitHub';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-4">
      <div className="container sm:px-8 mx-auto px-4">
        <div className="w-full text-center">
          <ul className="text-sm flex justify-center text-primary">
            <li className="mr-4 size-6">
              <a href="#" className="hover:text-primary-hover">
                <TwitterIcon />
              </a>
            </li>
            <li className="size-6">
              <a href="#" className="hover:text-primary-hover">
                <GitHubIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-4 text-center text-[0.8rem]">
        <p>&copy; 2024 Zettel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
