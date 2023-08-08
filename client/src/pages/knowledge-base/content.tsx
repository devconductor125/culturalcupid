const content = () => {
  const msgs = [
    'A very important message',
    'Important, update your settings',
    'How to make money and advertise for free?',
    'our advice to new members',
    'How to create post?',
    'how to use our search engine?',
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ padding: 12, border: '1px solid green' }}>NO.</th>
            <th style={{ border: '1px solid green' }}>Title</th>
            <th style={{ padding: 12, border: '1px solid green' }}>Read</th>
            <th style={{ border: '1px solid green' }}>Watch</th>
          </tr>
        </thead>
        <tbody>
          {msgs.map((msg, idx) => (
            <tr key={idx} style={{ border: '1px solid green' }}>
              <th style={{ border: '1px solid green' }}>{idx + 1}</th>
              <th style={{ border: '1px solid green', padding: '0px 12px' }}>
                {msg}
              </th>
              <th style={{ border: '1px solid green' }}>
                <img src="/read.png" alt="" />
              </th>
              <th style={{ border: '1px solid green' }}>
                <img src="/ytlogo.png" alt="" />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default content;
