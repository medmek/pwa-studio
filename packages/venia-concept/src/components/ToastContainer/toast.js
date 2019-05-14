import React, { useCallback } from 'react';
import { bool, func, number, oneOf, string } from 'prop-types';
import defaultClasses from './toast.css';
import { useToastActions } from '@magento/peregrine/src/Toasts/useToastActions';
import { mergeClasses } from 'src/classify';
import Icon from 'src/components/Icon';

const Toast = props => {
    const {
        actionText,
        dismissable,
        icon,
        id,
        message,
        onAction,
        onDismiss,
        type
    } = props;
    const classes = mergeClasses(defaultClasses, {});
    const { removeToast } = useToastActions();

    let handleDismiss, handleAction;
    if (dismissable) {
        handleDismiss = useCallback(() => {
            removeToast(id);
            onDismiss && onDismiss();
        });
    }

    if (onAction) {
        handleAction = useCallback(() => {
            removeToast(id);
            onAction && onAction();
        });
    }

    return (
        <div className={classes[`toast--${type}`]}>
            {icon ? (
                <Icon
                    className={classes[`icon--${type}`]}
                    src={icon}
                    attrs={{ width: 18 }}
                />
            ) : null}
            <div className={classes.message}>{message}</div>
            {dismissable ? (
                <div className={classes.controls}>
                    <button
                        className={classes.dismissButton}
                        onClick={handleDismiss}
                    >
                        {'×'}
                    </button>
                </div>
            ) : null}
            {onAction ? (
                <div className={classes.actions}>
                    <button
                        className={classes.actionButton}
                        onClick={handleAction}
                    >
                        {actionText}
                    </button>
                </div>
            ) : null}
        </div>
    );
};

Toast.propTypes = {
    actionText: string,
    dismissable: bool.isRequired,
    icon: func,
    id: number,
    message: string.isRequired,
    onAction: func,
    onDismiss: func,
    type: oneOf(['info', 'warning', 'error']).isRequired
};

export default Toast;