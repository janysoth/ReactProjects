// src/pages/Terms.jsx
import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

const Terms = () => {
  const lastUpdated = "May 27, 2025";

  return (
    <main>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <header>
          <Typography variant="h4" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Last updated: {lastUpdated}
          </Typography>
        </header>

        <Typography>
          By accessing or using this application, you agree to be bound by
          these Terms and Conditions. If you disagree with any part of the
          terms, then you may not access the service.
        </Typography>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h6">1. Use of the Service</Typography>
          <Typography>
            You agree to use the service only for lawful purposes and in a
            way that does not infringe the rights of, restrict, or inhibit
            anyone else's use and enjoyment of the service.
          </Typography>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h6">2. User Accounts</Typography>
          <Typography>
            When you create an account, you must provide accurate and
            complete information. You are responsible for safeguarding the
            password that you use to access the service.
          </Typography>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h6">3. Intellectual Property</Typography>
          <Typography>
            The service and its original content, features, and functionality
            are and will remain the exclusive property of the app owner.
          </Typography>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h6">4. Termination</Typography>
          <Typography>
            We may terminate or suspend access to our service immediately,
            without prior notice or liability, for any reason whatsoever.
          </Typography>
        </Box>

        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h6">5. Changes to Terms</Typography>
          <Typography paragraph>
            We reserve the right to modify or replace these terms at any
            time. Changes will be effective immediately upon being posted.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography>
            If you have any questions about these Terms, please contact us at{" "}
            <Link href="mailto:support@example.com">
              support@example.com
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </main>
  );
};

export default Terms;