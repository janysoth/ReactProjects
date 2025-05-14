const CustomLegend = ({ groupedData }) => {
  if (!groupedData || groupedData.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: '10px',
        columnGap: '24px',
        paddingTop: '24px',
        paddingBottom: '8px',
        maxWidth: '100%',
        overflow: 'visible', // ensure no clipping
      }}
    >
      {groupedData.map((item, index) => (
        <div
          key={index}
          style={{
            minWidth: '140px',
            display: 'flex',
            alignItems: 'flex-start',
            fontSize: '14px',
            flexDirection: 'row',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: item.color,
              display: 'inline-block',
              marginRight: 8,
              borderRadius: '50%',
              flexShrink: 0,
              marginTop: 4,
            }}
          />
          <div>
            <p style={{ margin: 0 }}>{item.name}</p>
            <p style={{ margin: 0 }}>{item.formatted} ({item.percent}%)</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;