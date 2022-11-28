export default function ({ userIp }) {
  return (
    <div>
      <p>Your Ip Address is :</p>
      <p>{userIp.ip}</p>
    </div>
  );
}
