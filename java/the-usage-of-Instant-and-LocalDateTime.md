# Instant와 LocalDateTime

<br>

### LocalDateTime 클래스

java docs

```text
A date-time without a time-zone in the ISO-8601 calendar system, such as 2007-12-03T10:15:30.

LocalDateTime is an immutable date-time object that represents a date-time, often viewed as year-month-day-hour-minute-second. Other date and time fields, such as day-of-year, day-of-week and week-of-year, can also be accessed. Time is represented to nanosecond precision. For example, the value "2nd October 2007 at 13:45.30.123456789" can be stored in a LocalDateTime.

This class does not store or represent a time-zone. Instead, it is a description of the date, as used for birthdays, combined with the local time as seen on a wall clock. It cannot represent an instant on the time-line without additional information such as an offset or time-zone.

The ISO-8601 calendar system is the modern civil calendar system used today in most of the world. It is equivalent to the proleptic Gregorian calendar system, in which today's rules for leap years are applied for all time. For most applications written today, the ISO-8601 rules are entirely suitable. However, any application that makes use of historical dates, and requires them to be accurate will find the ISO-8601 approach unsuitable.

This is a value-based class; programmers should treat instances that are equal as interchangeable and should not use instances for synchronization, or unpredictable behavior may occur. For example, in a future release, synchronization may fail. The equals method should be used for comparisons.
Implementation Requirements:

This class is immutable and thread-safe.
Since: 1.8
```

```java
package java.time;

@jdk.internal.ValueBased
public final class LocalDateTime
        implements Temporal, TemporalAdjuster, ChronoLocalDateTime<LocalDate>, Serializable { ... }
```

- ISO-8601 calendar 시스템에서 **time-zone이 없는** 날짜와 시간이다.
- immutable obejct & thread-safe
- offset 또는 time-zone이 별도로 없다면 time-line에서의 Instant(순간)을 나타낼 수 없다.
- 대부분의 애플리케이션에서 ISO-8601 규칙이 적합하지만, 과거 날짜를 사용하고 날짜가 정확해야 할 때 ISO-8601 접근 방식이 적합하지 않을 수 있다.
- value-based class: 인스턴스를 interchangeable(교환 가능)한 것처럼 다뤄야 하고, 동기화를 위해 인스턴스를 사용하지 말아야 한다.(향후 release에서 동기화가 실패할 수 있음)
- 비교는 equals 메서드를 사용해야 한다.
- jdk 1.8부터 지원
- 기타
  - 보통 년-월-일-시-분-초로 나타낸다.
  - 다른 date & time 필드(e.g. day-of-year, day-of-week, week-of-year)에 접근할 수 있다.
  - 시간은 나노초(e.g. 2nd October 2007 at 13:45.30.123456789)로 표현된다.

### Instant 클래스

java docs

```text
An instantaneous point on the time-line.

This class models a single instantaneous point on the time-line. This might be used to record event time-stamps in the application.

The range of an instant requires the storage of a number larger than a long. To achieve this, the class stores a long representing epoch-seconds and an int representing nanosecond-of-second, which will always be between 0 and 999,999,999. The epoch-seconds are measured from the standard Java epoch of 1970-01-01T00:00:00Z where instants after the epoch have positive values, and earlier instants have negative values. For both the epoch-second and nanosecond parts, a larger value is always later on the time-line than a smaller value.

Time-scale
The length of the solar day is the standard way that humans measure time. This has traditionally been subdivided into 24 hours of 60 minutes of 60 seconds, forming a 86400 second day.

Modern timekeeping is based on atomic clocks which precisely define an SI second relative to the transitions of a Caesium atom. The length of an SI second was defined to be very close to the 86400th fraction of a day.

Unfortunately, as the Earth rotates the length of the day varies. In addition, over time the average length of the day is getting longer as the Earth slows. As a result, the length of a solar day in 2012 is slightly longer than 86400 SI seconds. The actual length of any given day and the amount by which the Earth is slowing are not predictable and can only be determined by measurement. The UT1 time-scale captures the accurate length of day, but is only available some time after the day has completed.

The UTC time-scale is a standard approach to bundle up all the additional fractions of a second from UT1 into whole seconds, known as leap-seconds. A leap-second may be added or removed depending on the Earth's rotational changes. As such, UTC permits a day to have 86399 SI seconds or 86401 SI seconds where necessary in order to keep the day aligned with the Sun.

The modern UTC time-scale was introduced in 1972, introducing the concept of whole leap-seconds. Between 1958 and 1972, the definition of UTC was complex, with minor sub-second leaps and alterations to the length of the notional second. As of 2012, discussions are underway to change the definition of UTC again, with the potential to remove leap seconds or introduce other changes.
Given the complexity of accurate timekeeping described above, this Java API defines its own time-scale, the Java Time-Scale.

The Java Time-Scale divides each calendar day into exactly 86400 subdivisions, known as seconds. These seconds may differ from the SI second. It closely matches the de facto international civil time scale, the definition of which changes from time to time.

The Java Time-Scale has slightly different definitions for different segments of the time-line, each based on the consensus international time scale that is used as the basis for civil time. Whenever the internationally-agreed time scale is modified or replaced, a new segment of the Java Time-Scale must be defined for it. Each segment must meet these requirements:
the Java Time-Scale shall closely match the underlying international civil time scale;
 - the Java Time-Scale shall exactly match the international civil time scale at noon each day;
 - the Java Time-Scale shall have a precisely-defined relationship to the international civil time scale.
 - There are currently, as of 2013, two segments in the Java time-scale.

For the segment from 1972-11-03 (exact boundary discussed below) until further notice, the consensus international time scale is UTC (with leap seconds). In this segment, the Java Time-Scale is identical to UTC-SLS . This is identical to UTC on days that do not have a leap second. On days that do have a leap second, the leap second is spread equally over the last 1000 seconds of the day, maintaining the appearance of exactly 86400 seconds per day.

For the segment prior to 1972-11-03, extending back arbitrarily far, the consensus international time scale is defined to be UT1, applied proleptically, which is equivalent to the (mean) solar time on the prime meridian (Greenwich). In this segment, the Java Time-Scale is identical to the consensus international time scale. The exact boundary between the two segments is the instant where UT1 = UTC between 1972-11-03T00:00 and 1972-11-04T12:00.

Implementations of the Java time-scale using the JSR-310 API are not required to provide any clock that is sub-second accurate, or that progresses monotonically or smoothly. Implementations are therefore not required to actually perform the UTC-SLS slew or to otherwise be aware of leap seconds. JSR-310 does, however, require that implementations must document the approach they use when defining a clock representing the current instant. See Clock for details on the available clocks.

The Java time-scale is used for all date-time classes. This includes Instant, LocalDate, LocalTime, OffsetDateTime, ZonedDateTime and Duration.
This is a value-based class; programmers should treat instances that are equal as interchangeable and should not use instances for synchronization, or unpredictable behavior may occur. For example, in a future release, synchronization may fail. The equals method should be used for comparisons.
Implementation Requirements:
This class is immutable and thread-safe.
Since: 1.8
```

```java
package java.time;

@jdk.internal.ValueBased
public final class Instant
        implements Temporal, TemporalAdjuster, Comparable<Instant>, Serializable { ... }
```

- time-line에서의 instantaneous point(특정 순간)이다.

- 애플리케이션에서 특정 이벤트의 time-stamps를 기록하기 위해 보통 사용된다.

- Instant의 범위는 long 타입의 숫자보다 크다.

  - 이를 위해 epoch-seconds(표준 Java -> 1970-01-01T00:00:00Z) long과 0 ~ 999,999,999 사이의 나노초 int 를 저장한다.
  - epoch-seconds를 기준으로 이후 순간은 양수, 이전 순간은 음수 값을 가진다.

- Instant Java API는 자체 시간 척도인 Java Time-Scale 정의

- Java Time-Scale

  - 각 일자를 86400개의 초로 나누고, SI초와는 다를 수 있다.

  - 사실상의 international civil time scale을 따르며 그 정의는 변경될 수 있다.

  - 1972년 11월 3일 이후의 순간은 UTC segment를 따르고, UTC-SLS(Coordinated Universal Time-Smoothed Leap Seconds)와 동일하다.

  - java time-scale은 모든 date-time 클래스들에서 사용

    (e.g. Instant, LocalDate, LocalTime, OffsetDateTime, ZonedDateTime, Duration)

- value-based class: 인스턴스를 interchangeable(교환 가능)한 것처럼 다뤄야 하고, 동기화를 위해 인스턴스를 사용하지 말아야 한다.(향후 release에서 동기화가 실패할 수 있음)

- 비교는 equals 메서드를 사용해야 한다.

- Time-scale & UTC & Java Time-Scale에 대한 자세한 설명은 원문 참조

<br>

### LocalDateTime vs Instant

LocalDateTime은 offset과 time-zone 정보를 갖고 있지 않습니다. 반면에 Instant는 EPOCH-seconds(1970-01-01T00:00:00Z)를 기준으로 양수와 음수로 시간 정보를 제공합니다.

LocalDateTime에서 Local은 특정 지역을 나타내지는 않습니다. 단지 해당 서버가 위치한 local의 시간 정보를 나타냅니다.

반면에 Instant는 Java Time-Scale에 따른 UTC-SLS 시간을 제공하고, 위에서 설명된 것처럼 epoch-seconds(long)와 nanoseconds(int) 정보를 가지고 있어서 다음과 같이 두 파라미터 값을 전달하여 인스턴스를 생성합니다.

```java
Instant.EPOCH == new Instant(0 :epochSecond, 0 :nanos)
  
class Instant {
    private final long seconds;
    private final int nanos;
    
    private Instant(long epochSecond, int nanos) {
        super();
        this.seeconds = epochSecond;
        this.nanos = nanos;
    }
  
    //실제 인스턴스 생성은 static factory method로 제공
    //now(), ofEpochSecond(), ofEpochMilli(), from(), parse()
}
```

<br>

Java의 date-time 관련 객체를 추가적으로 알아본다.

<br>

### Date, Calendar

- Date 클래스는 jdk 1.0부터 제공되었으나 여러 문제점을 지님

  - 불변 객체가 아니라 thread-safe 하지 않음
  - 날짜 단위의 계산이 불편함
  - 표준 시간에 대한 기준이 모호함

- Calendar 클래스는 jdk1.1부터 제공되었으나 동일하게 여러 문제점을 지님

  - 불변 객체가 아니라 thread-safe 하지 않음

  - 헷갈리는 월(0~11)

    ```java
    Calendar calendar = Calendar.getInstance();
    calendar.set(1582, 9, 4);
    System.out.println("calendar = " + calendar.toInstant());
    // 1582-10-04T11:25:24.254Z
    ```

    - 10을 전달했지만 실제로는 11월로 나온다

  - 표준 UTC 시간대와 다른 기준 적용

    ```java
    Calendar calendar = Calendar.getInstance();
    calendar.set(1582, 9, 4);
    calendar.add(Calendar.DATE, 10);
    System.out.println("calendar = " + calendar.toInstant());
    // 1582-10-24T11:28:24.884Z
    ```

    - 10일을 더해 1582년 10월 14일을 기대했지만, 1582년 10월 24일이 나옴
    - 그레고리력 적용 시 율리우스력의 오차 교정을 위해 건너뛴 기간 때문

<br>

### package java.time;

- jdk 1.8에서 Date, Calendar 클래스를 사용하면서 나온 문제점을 해결하기 위해 해당 패키지에 새로운 클래스를 만듦

##### LocalDateTime

- LocalDate + LocalTime

- 용례

  - 특정 날짜와 시간을 여러 위치에서 적용하는 경우

    (크리스마스는 각 지역의 12월 25일인 경우)

  - 예약을 하는 경우

    (특정 지역의 시간으로 예약, zoneId를 함께 제공)

##### Instant

- UTC-SLS

##### OffsetDateTime

- Instant(UTC-SLS) + ZonedOffset
- ZonedOffset은 UTC 기준으로 앞과 뒤를 나타내는 '시간/분/초'의 양에 불과
- OffsetDateTime은 UTC에 offset의 양을 추가한 것

##### ZonedDateTime

- Instant(UTC-SLS) + ZoneId(`Continent/Region`)
- UTC 시간에서 time-zone 정보를 추가함(OffsetDateTime과의 차이점은 계절별 시간차(e.g. 일광절약시간 DTC) 등의 조정 규칙까지 추가되는 것)

<br>

### 결론

- 각 객체의 표현 방식

  ```java
  // Instant 2023-01-03T11:54:46.011002Z
  Instant instant = Instant.now();
  System.out.println("instant = " + instant);
  
  // LocalDateTime 2023-01-03T20:54:46.011254
  LocalDateTime localDateTime = LocalDateTime.now();
  System.out.println("localDateTime = " + localDateTime);
  
  // OffsetDateTime 2023-01-03T20:54:46.011356+09:00
  OffsetDateTime offsetDateTime = OffsetDateTime.now();
  System.out.println("offsetDateTime = " + offsetDateTime);
  
  // ZonedDateTime 2023-01-03T20:54:46.011308+09:00[Asia/Seoul]
  ZonedDateTime zonedDateTime = ZonedDateTime.now();
  System.out.println("zonedDateTime = " + zonedDateTime);
  ```

- 정확한 시간 계산이 필요한 경우 Instant 사용(지역과 관계없이 특정 순간을 나타내는 UTC이므로)
- 특정 지역에서의 local-time이 필요한 경우 Instant + time-zone 정보를 함께 사용
- 절대적인 시간을 계산하는 것이면 Instant를 사용하는 것이 좋고, 특정 지역의 서버에서 date+time을 표현할 때는 ZonedDateTime 사용
- 날짜 포맷팅을 위해선 DateTimeFormatter 활용

<br>

참고

> [java docs](https://docs.oracle.com/en/)
>
> [자바의정석](http://www.yes24.com/Product/Search?domain=ALL&query=%EC%9E%90%EB%B0%94%EC%9D%98%EC%A0%95%EC%84%9D&pid=123487&cosemkid=go16214999081121496&gclid=CjwKCAiAwc-dBhA7EiwAxPRylKVTDPRs90TULwd4DebaCAEPrCMVdfqvfXoP21PWoTktFjnIigZuiRoClHUQAvD_BwE)
>
> https://jaimemin.tistory.com/1537