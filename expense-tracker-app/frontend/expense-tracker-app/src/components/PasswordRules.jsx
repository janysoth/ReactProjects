import React from 'react';
import { passwordRulesList } from '../utils/helper';

const PasswordRules = ({ password }) => {
  return (
    <ul className="text-sm space-y-1 mt-2">
      {passwordRulesList.map(({ id, label, test }) => {
        const passed = test(password);
        return (
          <li
            key={id}
            className={`flex items-center gap-2 ${passed ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {passed ? (
              <span aria-label="check" role="img">✅</span>
            ) : (
              <span aria-label="cross" role="img">❌</span>
            )}
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordRules;