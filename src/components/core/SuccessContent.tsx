import { BsFillPatchCheckFill } from 'react-icons/bs';

const SuccessContent = ({ message }: { message: string }) => (
  <div className="wf-100 flex align-items-center">
    <BsFillPatchCheckFill fontSize={18} className="text-lemon-green mgr-16" />
    <span className="text-dark fs-15">{message}</span>
  </div>
);

export { SuccessContent as default };
