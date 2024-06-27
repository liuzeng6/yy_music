import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
export default function AlertDialog(props) {
    let { content = "这是一个提示框", confirmButtonText = "确定", cancelButtonText = "取消", open = false, handleClose, onPressed } = props

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"提示："}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {cancelButtonText}
                    </Button>
                    <Button onClick={onPressed} color="primary" autoFocus>
                        {confirmButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
