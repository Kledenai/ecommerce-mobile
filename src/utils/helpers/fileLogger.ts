import type {LogProps} from '@interfaces/utils/helper/fileLogger';
import {logger as log} from 'react-native-logs';
import * as FileSystem from 'expo-file-system';

const logFilePath = `${FileSystem.documentDirectory}log.txt`;
const maxLogFileSize = 1024 * 1024;
const maxLogFiles = 5;

let isRotating = false;

const ensureLogFileExists = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(logFilePath, '', {encoding: FileSystem.EncodingType.UTF8});
    }
  } catch (error) {
    console.error('Error ensuring log file exists:', error);
  }
};

ensureLogFileExists();

export const fileLogger = log.createLogger({
  levels: {
    custom: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  severity: __DEV__ ? 'debug' : 'error',
  transport: props => {
    logToFile(props);
    return props.msg;
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
});

const logToFile = async (props: LogProps) => {
  const logEntry = formatLogEntry(props);
  try {
    let existingLogs = '';
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    if (fileInfo.exists) {
      existingLogs = await FileSystem.readAsStringAsync(logFilePath, {encoding: FileSystem.EncodingType.UTF8});
    }

    const updatedLogs = existingLogs + logEntry;

    await FileSystem.writeAsStringAsync(logFilePath, updatedLogs, {encoding: FileSystem.EncodingType.UTF8});

    await checkLogFileSize();
  } catch (error) {
    console.error('Error writing log:', error);
  }
};

const formatLogEntry = (props: LogProps) => {
  return `[${props.level.text.toUpperCase()}] ${new Date().toISOString()} ${props.msg}\n`;
};

const checkLogFileSize = async () => {
  if (isRotating) return;

  try {
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    if (fileInfo.exists && fileInfo.size >= maxLogFileSize) {
      isRotating = true;
      await rotateLogFile();
      await deleteOldLogFiles();
      isRotating = false;
    }
  } catch (error) {
    isRotating = false;
    console.error('Error checking log file size:', error);
  }
};

const rotateLogFile = async () => {
  try {
    const rotatedLogFilePath = `${FileSystem.documentDirectory}log_${Date.now()}.txt`;
    await FileSystem.copyAsync({from: logFilePath, to: rotatedLogFilePath});
    await FileSystem.writeAsStringAsync(logFilePath, '', {encoding: FileSystem.EncodingType.UTF8});
  } catch (error) {
    console.error('Error rotating log file:', error);
  }
};

const deleteOldLogFiles = async () => {
  try {
    const logFiles = await getSortedLogFiles();
    const extraFiles = logFiles.slice(maxLogFiles);

    for (const file of extraFiles) {
      await FileSystem.deleteAsync(file.uri, {idempotent: true});
    }
  } catch (error) {
    console.error('Error deleting old log files:', error);
  }
};

const getSortedLogFiles = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
    const logFiles = files
      .filter(name => /^log_\d+\.txt$/.test(name))
      .map(name => ({
        name,
        uri: `${FileSystem.documentDirectory}${name}`,
        time: parseInt(name.match(/\d+/)?.[0] || '0', 10),
      }))
      .sort((a, b) => b.time - a.time);

    return logFiles;
  } catch (error) {
    console.error('Error reading log directory:', error);
    return [];
  }
};
