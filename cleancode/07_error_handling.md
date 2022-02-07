# 오류 처리

> 오류 처리는 프로그램에 반드시 필요한 요소 중 하나
>
> 깨끗한 코드와 오류 처리는 연관성이 있음
>
> - 오류 처리 코드로 인해 프로그램 논리를 이해하기 어려워진다면 깨끗한 코드라고 할 수 없음
> - 여기저기 흩어진 오류 처리 코드 때문에 실제 코드가 하는 일을 파악하기 어렵게 해서는 안됨



### 오류 코드보다 예외를 사용하라

```java
// bad
public class DeviceController {
	
	public void sendShutDown() {
		DeviceHandle handle = getHandle(DEV1);
		// 디바이스 상태를 점검한다.
		if (handle != DeviceHandle.INVALID) {
			// 레코드 필드에 디바이스 상태를 저장한다.
			retrieveDeviceRecord(handle);
			// 디바이스가 일시정지 상태가 아니라면 종료한다.
			if (record.getStatus() != DEVICE_SUSPENDED) {
				pauseDevice(handle);
				clearDeviceWorkQueue(handle);
				closeDevice(handle);
			} else {
				logger.log("Device suspended. Unable to shut down");
			}
		} else {
			logger.log("Invalid handle for: " + DEV1.toString());
		}
	}
}

// good
public class DeviceController {
	
	public void sendShutDown() {
		try {
			tryToShutDown();
		} catch (DeviceShutDownError e) {
			logger.log(e);
		}
		
		private void tryToShutDown() throws DeviceShutDownError {
			DeviceHandle handle = getHandle(DEV1);
			DeviceRecord record = retrieveDeviceRecord(handle);
			
			pauseDevice(handle);
			clearDeviceWorkQueue(handle);
			closeDevice(handle);
		}
		
		private DeviceHandle getHandle(DeviceID id) {
			//...
			throw new DeviceShutDownError("Invalid handle for: " + id.toString());
		}
	}
}
```

- 오류 코드를 일일이 작성하면 호출자 코드가 복잡해짐(함수를 호출한 즉시 오류를 확인해야 하기 때문)
- 디바이스를 종료하는 알고리즘과 오류를 처리하는 알고리즘을 분리해서 각 개념을 독립적으로 이해할 수 있게됨