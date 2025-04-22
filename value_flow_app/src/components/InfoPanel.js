import React from 'react';
import { Card } from 'react-bootstrap';

function InfoPanel({ selectedNode, data, view }) {
  // Find node data based on selectedNode ID (implementation needed)
  const nodeData = selectedNode ? data?.processes?.find(p => p.id === selectedNode) || data?.inventoryPoints?.find(i => i.id === selectedNode) || data?.suppliers?.find(s => s.id === selectedNode) : null;

  return (
    <Card className="mt-3">
      <Card.Header>Information Panel</Card.Header>
      <Card.Body>
        {selectedNode ? (
          nodeData ? (
            <>
              <Card.Title>{nodeData.name || 'Selected Node'}</Card.Title>
              <pre>{JSON.stringify(nodeData, null, 2)}</pre>
              {/* Display specific details based on node type and view */}
            </>
          ) : (
            <p>Details for node ID '{selectedNode}' not found.</p>
          )
        ) : (
          <p>Select a node on the map to see details.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default InfoPanel;
