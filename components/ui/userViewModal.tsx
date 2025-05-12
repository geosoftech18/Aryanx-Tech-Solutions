import { Modal } from "./modal";

// UserViewModal: shows user details in a modal
function UserViewModal({ user, open, onClose }: { user: any; open: boolean; onClose: () => void }) {
  if (!user) return null;
  return (
    <Modal
      title="User Details"
      description={`Details for user: ${user.name}`}
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-2 text-sm">
        <div><span className="font-semibold">ID:</span> {user.id}</div>
        <div><span className="font-semibold">Name:</span> {user.name}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
        <div><span className="font-semibold">Role:</span> {user.role}</div>
        <div><span className="font-semibold">Status:</span> {user.status}</div>
        <div><span className="font-semibold">Joined:</span> {user.joined}</div>
        {/* Add avatar and more fields as needed */}
      </div>
    </Modal>
  );
}

export default UserViewModal; 